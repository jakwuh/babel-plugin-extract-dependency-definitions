@Inject({session1: 'session1'})
export class User1 {}

@Provide('currentUser2')
export class User22 {}

@Provide('currentUser.customFactory', {session2: 'session2'})
export class User2 {}

@AutoInject
export class User3 {

    updateDependencies({session3, event: {query: q}}) {
    }

}

export class SimpleClass {
    
}

@AutoProvide('profileUser')
export class User4 {

    updateDependencies({session4, event: {query}}) {
    }

}

@Inject({})
export class User5 {

    @Provide('pageUser', {
        session5: 'session5'
    })
    updatePage({event: {query}}) {
    }

}

export class User6 {

    @AutoProvide('footerUser.anotherFactory')
    updateFooter({definition, ClientRequest: request}) {
    }

}
