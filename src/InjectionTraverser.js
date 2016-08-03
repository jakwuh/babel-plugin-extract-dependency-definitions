import ClassVisitor from './ClassVisitor';
import MethodVisitor from './MethodVisitor';

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

export default class InjectionTraverser {

    constructor({types}) {
        this.classVisitor = new ClassVisitor({types});
        this.methodVisitor = new MethodVisitor({types});
    }

    visitClassDeclaration(classNode) {
        (classNode.decorators || []).map(decoratorNode => {
            this.visitDecorator(this.classVisitor, {decoratorNode, classNode});
        });
    }

    visitClassMethodDefinition(classNode, methodNode) {
        (methodNode.decorators || []).map(decoratorNode => {
            this.visitDecorator(this.methodVisitor, {decoratorNode, methodNode, classNode});
        });
    }

    // noinspection JSMethodCanBeStatic
    visitDecorator(visitor, params) {
        params.className = visitor.getClassName(params.classNode);
        params.methodName = visitor.getMethodName(params.methodNode);
        params.decoratorName = visitor.getDecoratorName(params.decoratorNode);
        if (VISIT_MAP.hasOwnProperty(params.decoratorName)) {
            visitor[VISIT_MAP[params.decoratorName]](params);
        }
    }

}
