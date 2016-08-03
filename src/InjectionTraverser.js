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
        this.types = types;
        this.visitors = {
            'class': new ClassVisitor({types}),
            'method': new MethodVisitor({types})
        };
    }

    visitClassDeclaration(classNode) {
        (classNode.decorators || []).map(decoratorNode => {
            this.visitClassDecorator(decoratorNode, classNode);
        });
    }

    visitClassDecorator(decoratorNode, classNode) {
        const visitor = this.visitors.class;
        const className = visitor.getClassName(classNode);
        const decoratorName = decoratorNode.expression.callee.name;
        if (VISIT_MAP.hasOwnProperty(decoratorName)) {
            visitor[VISIT_MAP[decoratorName]]({decoratorNode, decoratorName, classNode, className});
        }
    }

    visitMethodDefinition(methodNode, classNode) {
        (methodNode.decorators || []).map(decoratorNode => {
            this.visitMethodDecorator(decoratorNode, methodNode, classNode);
        });
    }

    visitMethodDecorator(decoratorNode, methodNode, classNode) {
        const visitor = this.visitors.method;
        const className = visitor.getClassName(classNode);
        const methodName = visitor.getMethodName(methodNode);
        const decoratorName = decoratorNode.expression.callee.name;
        if (VISIT_MAP.hasOwnProperty(decoratorName)) {
            const params = {decoratorNode, decoratorName, methodNode, methodName, classNode, className};
            visitor[VISIT_MAP[decoratorName]](params);
        }
    }

}
