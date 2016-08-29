import InjectionTraverser from './InjectionTraverser';

export default function({Plugin, types}) {

    return new Plugin('extract-dependency-definitions', {
        visitor: {
            ClassDeclaration(classNode, parent, scope, file) {
                const traverser = new InjectionTraverser({types});
                const programNode = file.ast.program;

                traverser.visitClassDeclaration(classNode);
                (classNode.body.body || []).map(methodNode => {
                    traverser.visitClassMethodDefinition(classNode, methodNode);
                });

                traverser.exportDefinitions(programNode);
            }
        }
    });

};
