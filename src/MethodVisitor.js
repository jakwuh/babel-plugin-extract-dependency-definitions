import Visitor from './Visitor';
import {addProvideDefinition} from './Inject';

export default class MethodVisitor extends Visitor {

    visitProvideDecorator(params) {
        this.visitDecorator(params, {auto: false});
    }

    visitAutoProvideDecorator(params) {
        this.visitDecorator(params, {auto: true});
    }

    visitDecorator({methodNode, methodName, decoratorNode: {expression}, className}, {auto}) {
        const [definitionAST, dependenciesAST] = expression.arguments;
        const definition = this.parseStringAST(definitionAST);
        const dependencies = auto ? this.getMethodDependencies(methodNode) : this.parseObjectAST(dependenciesAST);
        addProvideDefinition(definition, dependencies, {name: className}, methodName);
    }

}
