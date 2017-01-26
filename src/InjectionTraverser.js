import ClassVisitor from './ClassVisitor';
import MethodVisitor from './MethodVisitor';
import {normalizeDefinition} from 'di';
import {parse} from 'babylon';
import {isEmpty, isArray} from 'lodash';

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

    visitClassDeclaration(path) {
        let decorators = path.get('decorators');
        if (isArray(decorators)) {
            decorators.map(path => {
                let decoratorNode = path.node;
                let classNode = path.parent;
                if (!this.visitDecorator(this.classVisitor, {decoratorNode, classNode})) {
                    path.remove();
                }
            })
        }
    }

    visitClassMethodDefinition(path, classNode) {
        let decorators = path.get('decorators');
        if (isArray(decorators)) {
            decorators.map(path => {
                let decoratorNode = path.node;
                let methodNode = path.parent;
                if (!this.visitDecorator(this.methodVisitor, {decoratorNode, classNode, methodNode})) {
                    path.remove();
                }
            });
            if (!path.get('decorators').length) {
                delete path.node.decorators;
            }

        }
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

    exportDefinitions(programPath, {className}) {
        let definitionsPath, definitions;
        let programNode = programPath.node;
        let bodyPaths = programPath.get('body');

        if (isEmpty(this.definitions)) {
            return;
        }
        if (programNode[EXPORTS_NODE_KEY]) {
            definitionsPath = programNode[EXPORTS_NODE_KEY].definitionsPath;
            definitions = programNode[EXPORTS_NODE_KEY].definitions;
            Object.assign(definitions, this.definitions);
            definitionsPath.replaceWith(this.getDefinitionsAST(definitions, {className}));
        } else {
            definitions = this.definitions;
            [definitionsPath] = bodyPaths[bodyPaths.length - 1].insertAfter(this.getDefinitionsAST(definitions, {className}));
        }

        programNode[EXPORTS_NODE_KEY] = {definitionsPath, definitions};

    }

    getDefinitionsAST(definitions, {className}) {
        return parse(
            `Object.defineProperty(${className}, "${EXPORTS_KEY}", {value: ${JSON.stringify(definitions)}});`
        ).program.body[0];
    }

}
