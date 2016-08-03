Babel transformer for static dependency injection analysis.

Usage:

```bash
npm i --save-dev babel-transform-dependency-injection
```

```javascript

// .babelrc

{
    "plugins": ["babel-plugin-transform-dependency-injection"],
    "extra": {
        "transform-dependency-injection": {
            "output": "./src/di.json" // default: './di.conf.json'
        }
    }
}

/** or */

// webpack.conf.js

...

    module: {
        loaders: [{
            test: /\.js$/,
            include: [/** ... */],
            loader: 'babel',
            query: {
                optional: ['runtime'],
                cacheDirectory: true,
                plugins: ['babel-plugin-transform-dependency-injection'],
                extra: {
                    'transform-dependency-injection': {
                        output: path.join(__dirname, '../src/di.json') // default: './di.conf.json'
                    }
                }
            }
        }]
    }

...

```
