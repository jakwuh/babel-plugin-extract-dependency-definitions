import Visitor from './Visitor';
import {addInjectDefinition, addProvideDefinition} from './Inject';

export default class MethodVisitor extends Visitor {

    visitProvideDecorator({methodNode, methodName, decoratorNode: {expression}, className}) {
        const [definitionAST, dependenciesAST] = expression.arguments;
        const definition = this.parseStringAST(definitionAST);
        const dependencies = this.parseObjectAST(dependenciesAST);
        addProvideDefinition(definition, dependencies, {name: className}, methodName);
    }

    visitAutoProvideDecorator({methodNode, methodName, decoratorNode: {expression}, className}) {
        const [definitionAST] = expression.arguments;
        const definition = this.parseStringAST(definitionAST);
        const dependencies = this.getMethodDependencies(methodNode);
        addProvideDefinition(definition, dependencies, {name: className}, methodName);
    }

}
