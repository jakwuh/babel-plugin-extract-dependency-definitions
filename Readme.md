# babel-plugin-extract-dependency-definitions [![Build Status](https://travis-ci.org/jakwuh/babel-plugin-extract-dependency-definitions.svg?branch=master)](https://travis-ci.org/jakwuh/babel-plugin-extract-dependency-definitions)
Babel transformer for static dependency injection analysis. 

This babel plugin converts DI decorators to DI definitions and exports them.

## Installation:

```bash
npm i --save babel-plugin-extract-dependency-definitions
```

## Example:

Initial ES6 module: 
```js
// ...
@Inject({session1: 'session1'})
class User1 {}

@Provide('currentUser2')
class User22 {}

@Provide('currentUser.customFactory', {session2: 'session2'})
class User2 {}

@AutoInject()
class User3 {

    updateDependencies({session3, event: {query: q}}) {
    }

}

@AutoProvide('profileUser')
class User4 {

    updateDependencies({session4, event: {query}}) {
    }

}

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
        updateFooter({definition, request}) {
        }

    }
});

```

After transpilation the following code will be added to the module:

```js
Object.defineProperty(exports, "__diDefinitions", {
    value: {
        "User1": {"session1": "session1"},
        "currentUser2": ["User22.factory", {}],
        "currentUser": ["User2.customFactory", {"session2": "session2"}],
        "User3": {"session3": "session3"},
        "profileUser": ["User4.factory", {"session4": "session4"}],
        "pageUser": ["User5.factory#updatePage", {"session5": "session5"}],
        "footerUser": ["User6.anotherFactory#updateFooter", {
            "request": "request"
        }]
    }
});
```

## Usage:


```js
// .babelrc
{
    "plugins": ["extract-dependency-definitions"]
}
```

or

```js
// webpack.conf.js

module.exports = {
    // ...
    
    loaders: [{
        test: /\.js$/,
        loader: 'babel',
        query: JSON.stringify({
            plugins: ['extract-dependency-definitions']
        })
    }]

}

```
