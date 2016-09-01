import ClassVisitor from './ClassVisitor';
import MethodVisitor from './MethodVisitor';
import {normalizeDefinition} from 'di';
import {parse} from 'babylon';
import {extend, isEmpty} from 'lodash';

const INJECT_DECORATOR = 'Inject';
const PROVIDE_DECORATOR = 'Provide';
const AUTOINJECT_DECORATOR = 'AutoInject';
const AUTOPROVIDE_DECORATOR = 'AutoProvide';

const VISIT_MAP = {
    [INJECT_DECORATOR]: 'visitInjectDecorator',
    [PROVIDE_DECORATOR]: 'visitProvideDecorator',
    [AUTOINJECT_DECORATOR]: 'visitAutoInjectDecorator',
    [AUTOPROVIDE_DECORATOR]: 'visitAutoProvideDecorator'
};

const EXPORTS_KEY = '__diDefinitions';
const EXPORTS_NODE_KEY = 'DEPENDENCY_INJECTION_EXPORTS_NODE_ID';

export default class InjectionTraverser {

    constructor({types}) {
        this.definitions = {};
        this.classVisitor = new ClassVisitor({types, container: this});
        this.methodVisitor = new MethodVisitor({types, container: this});
    }

    visitClassDeclaration(classNode) {
        classNode.decorators = (classNode.decorators || []).filter(decoratorNode => {
            return this.visitDecorator(this.classVisitor, {decoratorNode, classNode});
        });
    }

    visitClassMethodDefinition(classNode, methodNode) {
        methodNode.decorators = (methodNode.decorators || []).filter(decoratorNode => {
            return this.visitDecorator(this.methodVisitor, {decoratorNode, methodNode, classNode});
        });
    }

    visitDecorator(visitor, params) {
        params.className = visitor.getClassName(params.classNode);
        params.methodName = visitor.getMethodName(params.methodNode);
        params.decoratorName = visitor.getDecoratorName(params.decoratorNode);
        if (VISIT_MAP.hasOwnProperty(params.decoratorName)) {
            visitor[VISIT_MAP[params.decoratorName]](params);
            return false;
        }
        return true;
    }

    addProvideDefinition(definition, dependencies = {}, {name: bundle}, update) {
        let {factory, bundleName: dependencyId} = normalizeDefinition(definition);

        if (update) {
            this.definitions[dependencyId] = [`${bundle}.${factory}#${update}`, dependencies];
        } else {
            this.definitions[dependencyId] = [`${bundle}.${factory}`, dependencies];
        }
    }

    addInjectDefinition(dependencies, {name: dependencyId}) {
        this.definitions[dependencyId] = dependencies;
    }

    exportDefinitions(programNode) {
        let id, definitions;

        if (isEmpty(this.definitions)) {
            return;
        }
        
        if (programNode[EXPORTS_NODE_KEY]) {
            id = programNode[EXPORTS_NODE_KEY].id;
            definitions = extend(programNode[EXPORTS_NODE_KEY].definitions, this.definitions);
            programNode.body[id] = this.getDefinitionsAST(definitions);
        } else {
            id = programNode.body.length;
            definitions = this.definitions;
            programNode.body.push(this.getDefinitionsAST(definitions));
        }

        programNode[EXPORTS_NODE_KEY] = {id, definitions};

    }

    getDefinitionsAST(definitions) {
        const insertAST = parse(
            `Object.defineProperty(exports, "${EXPORTS_KEY}", {value: ${JSON.stringify(definitions)}});`
        );
        return insertAST.program.body[0];
    }

}
