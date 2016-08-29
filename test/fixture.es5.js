'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function Inject() {
    return function () {};
}
function Provide() {
    return function () {};
}
function AutoInject() {
    return function () {};
}
function AutoProvide() {
    return function () {};
}

var User1 = (function () {
    function User1() {
        _classCallCheck(this, _User1);
    }

    var _User1 = User1;
    User1 = Inject({ session1: 'session1' })(User1) || User1;
    return User1;
})();

var User22 = (function () {
    function User22() {
        _classCallCheck(this, _User22);
    }

    var _User22 = User22;
    User22 = Provide('currentUser2')(User22) || User22;
    return User22;
})();

var User2 = (function () {
    function User2() {
        _classCallCheck(this, _User2);
    }

    var _User2 = User2;
    User2 = Provide('currentUser.customFactory', { session2: 'session2' })(User2) || User2;
    return User2;
})();

var User3 = (function () {
    function User3() {
        _classCallCheck(this, _User3);
    }

    _createClass(User3, [{
        key: 'updateDependencies',
        value: function updateDependencies(_ref) {
            var session3 = _ref.session3;
            var q = _ref.event.query;
        }
    }]);

    var _User3 = User3;
    User3 = AutoInject()(User3) || User3;
    return User3;
})();

var User4 = (function () {
    function User4() {
        _classCallCheck(this, _User4);
    }

    _createClass(User4, [{
        key: 'updateDependencies',
        value: function updateDependencies(_ref2) {
            var session4 = _ref2.session4;
            var query = _ref2.event.query;
        }
    }]);

    var _User4 = User4;
    User4 = AutoProvide('profileUser')(User4) || User4;
    return User4;
})();

var User5 = (function () {
    function User5() {
        _classCallCheck(this, User5);
    }

    _createDecoratedClass(User5, [{
        key: 'updatePage',
        decorators: [Provide('pageUser', {
            session5: 'session5'
        })],
        value: function updatePage(_ref3) {
            var query = _ref3.event.query;
        }
    }]);

    return User5;
})();

exports.User5 = User5;

Promise.resolve().then(function () {
    var User6 = (function () {
        function User6() {
            _classCallCheck(this, User6);
        }

        _createDecoratedClass(User6, [{
            key: 'updateFooter',
            decorators: [AutoProvide('footerUser.anotherFactory')],
            value: function updateFooter(_ref4) {
                var definition = _ref4.definition;
                var request = _ref4.request;
            }
        }]);

        return User6;
    })();
});
Object.defineProperty(exports, "__diDefinitions", { value: { "User1": { "session1": "session1" }, "currentUser2": ["User22.factory", {}], "currentUser": ["User2.customFactory", { "session2": "session2" }], "User3": {
            "session3": "session3" }, "profileUser": ["User4.factory", { "session4": "session4" }], "pageUser": ["User5.factory#updatePage", { "session5": "session5" }], "footerUser": ["User6.anotherFactory#updateFooter", { "request": "request" }] } });