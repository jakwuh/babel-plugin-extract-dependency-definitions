import Visitor from './Visitor';
import {addInjectDefinition, addProvideDefinition} from './Inject';

const DEFAULT_UPDATE_METHOD = 'updateDependencies';

export default class ClassVisitor extends Visitor {

    visitInjectDecorator({decoratorNode: {expression}, className: name}) {
        const isCallExpression = this.types.isCallExpression(expression);
        if (isCallExpression && expression.arguments.length === 1) {
            const dependenciesAST = expression.arguments[0];
            addInjectDefinition(this.parseObjectAST(dependenciesAST), {name});
        }
    }

    visitProvideDecorator({decoratorNode: {expression}, className: name}) {
        const isCallExpression = this.types.isCallExpression(expression);
        if (isCallExpression && expression.arguments.length > 0) {
            const [definitionAST, dependenciesAST] = expression.arguments;
            const definition = this.parseStringAST(definitionAST);
            const dependencies = this.parseObjectAST(dependenciesAST);
            addProvideDefinition(definition, dependencies, {name});
        }
    }

    visitAutoInjectDecorator({decoratorNode: {expression}, classNode, className}) {
        const methodDefinition = this.findMethodDefinition(classNode.body.body, DEFAULT_UPDATE_METHOD);
        if (methodDefinition) {
            const dependencies = this.getMethodDependencies(methodDefinition);
            addInjectDefinition(dependencies, {name: className});
        } else {
            this.throwNoUpdateMethodError({className});
        }
    }

    visitAutoProvideDecorator({decoratorNode: {expression}, classNode, className}) {
        const methodDefinition = this.findMethodDefinition(classNode.body.body, DEFAULT_UPDATE_METHOD);
        if (methodDefinition) {
            const [definitionAST] = expression.arguments;
            const definition = this.parseStringAST(definitionAST);
            const dependencies = this.getMethodDependencies(methodDefinition);
            addProvideDefinition(definition, dependencies, {name: className});
        } else {
            this.throwNoUpdateMethodError({className});
        }
    }

    findMethodDefinition(methods = [], name) {
        return methods.find(method => name === this.getMethodName(method));
    }

    // noinspection JSMethodCanBeStatic
    throwNoUpdateMethodError({className}) {
        throw new SyntaxError(`class ${className} has @AutoInject decorator but no '${DEFAULT_UPDATE_METHOD}' method was found`);
    }

}
