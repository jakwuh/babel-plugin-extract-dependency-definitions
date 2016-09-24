import InjectionTraverser from './InjectionTraverser';

export default function({types}) {
    return {
        visitor: {
            ClassDeclaration: {
                enter(path, state) {
                    const traverser = new InjectionTraverser({types});
                    const programPath = state.file.path;
                    const classNode = path.node;
                    
                    traverser.visitClassDeclaration(path);
                    
                    path.get('body.body').map(path => {
                        traverser.visitClassMethodDefinition(path, classNode);
                    });

                    traverser.exportDefinitions(programPath);
                }
            }
        }
    };
}