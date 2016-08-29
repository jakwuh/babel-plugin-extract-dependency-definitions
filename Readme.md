Babel transformer for static dependency injection analysis. [![Build Status](https://travis-ci.org/jakwuh/babel-plugin-extract-dependency-definitions.svg?branch=master)](https://travis-ci.org/jakwuh/babel-plugin-extract-dependency-definitions)

#### Usage:

```bash
npm i --save babel-plugin-extract-dependency-definitions
```

```javascript

// .babelrc

{
    "plugins": ["extract-dependency-definitions"]
}

/** or */

// webpack.conf.js

...

    loaders: [{
        test: /\.js$/,
        loader: 'babel',
        query: JSON.stringify({
            plugins: ['extract-dependency-definitions']
        })
    }]

...

```
