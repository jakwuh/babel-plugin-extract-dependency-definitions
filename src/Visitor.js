import generate from 'babel-generator';
import {omit, uniq, zipObject} from 'lodash';

const RESERVED_DI_NAMES = ['event', 'definition', 'diSessionId'];

export default class Visitor {

    constructor({types, container}) {
        this.types = types;
        this.container = container;
    }

    getClassName({id: {name}}) {
        return name;
    }

    getMethodName({key: {name} = {}} = {}) {
        return name;
    }

    getDecoratorName({expression}) {
        return expression.name || expression.callee.name;
    }

    getMethodDependencies(definition) {
        const [dependenciesAST] = definition.params;
        if (this.types.isObjectPattern(dependenciesAST)) {
            const keys = Object.keys(omit(this.parseObjectAST(dependenciesAST), RESERVED_DI_NAMES));
            return zipObject(keys, keys);
        } else {
            return {};
        }
    }

    assertValidMethodDefinition(methodDefinition, {className}) {
        if (!methodDefinition) {
            throw new SyntaxError(`class ${className} has @AutoInject(@AutoProvide) decorator but no '${DEFAULT_UPDATE_METHOD}' method was found`);
        }
    }

    parseAST(ast) {
        return generate(ast).code;
    }

    parseStringAST(ast) {
        return eval(this.parseAST(ast));
    }

    parseObjectAST(ast) {
        if (ast) {
            const map = {};
            const code = this.parseAST(ast);
            const lets = uniq(code.match(/\w+/g)).map(v => `${v}='${v}'`).join(',');
            return (function(){return eval((lets.length ? `var ${lets}; ` : '') + `(${code});`)})();
        } else {
            return {};
        }
    }

    /** @abstract */
    visitInjectDecorator() {
    }

    /** @abstract */
    visitProvideDecorator() {
    }

    /** @abstract */
    visitAutoInjectDecorator() {
    }

    /** @abstract */
    visitAutoProvideDecorator() {
    }

}
