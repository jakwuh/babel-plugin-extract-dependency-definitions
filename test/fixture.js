@Inject({session1: 'session1'})
class User1 {}

@Provide('currentUser2')
class User22 {}

@Provide('currentUser.customFactory', {session2: 'session2'})
class User2 {}

@AutoInject
class User3 {

    updateDependencies({session3, event: {query: q}}) {
    }

}

class SimpleClass {
    
}

@AutoProvide('profileUser')
class User4 {

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

Promise.resolve().then(() => {
    class User6 {

        @AutoProvide('footerUser.anotherFactory')
        updateFooter({definition, ClientRequest: request}) {
        }

    }
});
