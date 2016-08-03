import {extend} from 'lodash';
import {normalizeDefinition} from 'di';

const definitions = {};

export function addProvideDefinition(definition, dependencies = {}, {name: bundle}, update) {
    let {factory, bundleName: dependencyId} = normalizeDefinition(definition);

    if (update) {
        definitions[dependencyId] = [`${bundle}.${factory}#${update}`, dependencies];
    } else {
        definitions[dependencyId] = [`${bundle}.${factory}`, dependencies];
    }
}

export function addInjectDefinition(dependencies, {name: dependencyId}) {
    definitions[dependencyId] = dependencies;
}

export function getDefinitions() {
    return extend({}, definitions);
}
