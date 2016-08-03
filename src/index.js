import InjectionTraverser from './InjectionTraverser';
import {getDefinitions} from './Inject';
import {get as at} from 'lodash';
import fs from 'fs';

export default function test ({Plugin, types}) {
    const traverser = new InjectionTraverser({types});

    return new Plugin('transform-dependency-injection', {
        visitor: {
            ClassDeclaration(classNode) {
                traverser.visitClassDeclaration(classNode);
                (classNode.body.body || []).map(methodNode => {
                    traverser.visitMethodDefinition(methodNode, classNode);
                });
            }
        },
        post(file) {
            const defaultPath = './di.conf.json';
            const customPath = at(file, 'opts.extra.transform-dependency-injection.output');
            fs.writeFileSync(customPath || defaultPath, JSON.stringify(getDefinitions(), null, 2));
        }
    });

};
