const babel = require('babel');
const path = require('path');
const fs = require('fs');
const expect = require('chai').expect;

const code = fs.readFileSync(path.join(__dirname, 'fixture.js'));

babel.transform(code, {
    stage: 0,
    plugins: ['../index'],
    extra: {
        'transform-dependency-injection': {
            output: path.join(__dirname, './di.json')
        }
    }
});

const di = require(path.join(__dirname, './di.json'));

describe('babel-plugin-transform-dependency-injection', function() {

    it('should build correct di', function() {
       expect(di).to.be.eql({ User1: { session1: 'session1' },
           currentUser2: [ 'User22.factory', {} ],
           currentUser: [ 'User2.customFactory', { session2: 'session2' } ],
           User3: { session3: 'session3' },
           profileUser: [ 'User4.factory', { session4: 'session4' } ],
           pageUser: [ 'User5.factory#updatePage', { session5: 'session5' } ],
           footerUser: [ 'User6.anotherFactory#updateFooter', { request: 'request' } ] }
       );
   })

});

