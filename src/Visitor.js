import generate from 'babel-core/lib/generation'
import {omit, uniq} from 'lodash';

const RESERVED_DI_NAMES = ['event', 'definition', 'diSessionId'];

export default class Visitor {

    constructor({types}) {
        this.types = types;
    }

    // noinspection JSMethodCanBeStatic
    getClassName({id: {name}}) {
        return name;
    }

    // noinspection JSMethodCanBeStatic
    getMethodName({key: {name} = {}} = {}) {
        return name;
    }

    // noinspection JSMethodCanBeStatic
    getDecoratorName({expression: {callee: {name}}}) {
        return name;
    }

    getMethodDependencies(definition) {
        const [dependenciesAST] = definition.value.params;
        if (this.types.isObjectPattern(dependenciesAST)) {
            return omit(this.parseObjectAST(dependenciesAST), RESERVED_DI_NAMES);
        } else {
            return {};
        }
    }

    // noinspection JSMethodCanBeStatic
    assertValidMethodDefinition(methodDefinition, {className}) {
        if (!methodDefinition) {
            throw new SyntaxError(`class ${className} has @AutoInject(@AutoProvide) decorator but no '${DEFAULT_UPDATE_METHOD}' method was found`);
        }
    }

    // noinspection JSMethodCanBeStatic
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
            return eval(`let ${lets}; (${code});`);
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
