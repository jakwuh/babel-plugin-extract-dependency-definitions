const babel = require('babel');
const path = require('path');
const fs = require('fs');
const expect = require('chai').expect;

describe('babel-plugin-extract-dependency-definitions', function () {

    const fixturePath = path.join(__dirname, 'fixture.es5.js');

    before(function() {
        const code = fs.readFileSync(path.join(__dirname, 'fixture.js'));
        const fixtureExists = fs.existsSync(fixturePath);

        if (fixtureExists) {
            fs.unlinkSync(fixturePath);
        }

        const transformedCode = babel.transform(code, {
            stage: 0,
            plugins: ['../']
        }).code;

        fs.writeFileSync(fixturePath, transformedCode);
    });

    it('should build correct di', function () {
        const di = require(fixturePath).__diDefinitions;
        expect(di).to.be.eql({
                User1: {session1: 'session1'},
                currentUser2: ['User22.factory', {}],
                currentUser: ['User2.customFactory', {session2: 'session2'}],
                User3: {session3: 'session3'},
                User5: {},
                profileUser: ['User4.factory', {session4: 'session4'}],
                pageUser: ['User5.factory#updatePage', {session5: 'session5'}],
                footerUser: ['User6.anotherFactory#updateFooter', {ClientRequest: 'ClientRequest'}]
            }
        );
    })

});

