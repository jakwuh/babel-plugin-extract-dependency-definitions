import Visitor from './Visitor';
import {addInjectDefinition, addProvideDefinition} from './Inject';

const DEFAULT_UPDATE_METHOD = 'updateDependencies';

export default class ClassVisitor extends Visitor {

    visitInjectDecorator({decoratorNode: {expression}, className: name}) {
        if (this.isSuitableCallExpression(expression)) {
            const [dependenciesAST] = expression.arguments;
            const dependencies = this.parseObjectAST(dependenciesAST);
            addInjectDefinition(dependencies, {name});
        }
    }

    visitProvideDecorator({decoratorNode: {expression}, className: name}) {
        if (this.isSuitableCallExpression(expression)) {
            const [definitionAST, dependenciesAST] = expression.arguments;
            const definition = this.parseStringAST(definitionAST);
            const dependencies = this.parseObjectAST(dependenciesAST);
            addProvideDefinition(definition, dependencies, {name});
        }
    }

    visitAutoInjectDecorator({decoratorNode: {expression}, classNode, className}) {
        const methodDefinition = this.findMethodDefinition(classNode.body.body, DEFAULT_UPDATE_METHOD);
        this.assertValidMethodDefinition(methodDefinition, {className});

        const dependencies = this.getMethodDependencies(methodDefinition);
        addInjectDefinition(dependencies, {name: className});
    }

    visitAutoProvideDecorator({decoratorNode: {expression}, classNode, className}) {
        const methodDefinition = this.findMethodDefinition(classNode.body.body, DEFAULT_UPDATE_METHOD);
        this.assertValidMethodDefinition(methodDefinition, {className});

        const [definitionAST] = expression.arguments;
        const definition = this.parseStringAST(definitionAST);
        const dependencies = this.getMethodDependencies(methodDefinition);
        addProvideDefinition(definition, dependencies, {name: className});
    }

    findMethodDefinition(methods = [], name) {
        return methods.find(method => name === this.getMethodName(method));
    }

    isSuitableCallExpression(expression) {
        return this.types.isCallExpression(expression) && expression.arguments.length > 0;
    }

}
