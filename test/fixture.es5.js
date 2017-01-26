'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User1 = exports.User1 = function User1() {
    _classCallCheck(this, User1);
};

var User22 = exports.User22 = function User22() {
    _classCallCheck(this, User22);
};

var User2 = exports.User2 = function User2() {
    _classCallCheck(this, User2);
};

var User3 = exports.User3 = function () {
    function User3() {
        _classCallCheck(this, User3);
    }

    _createClass(User3, [{
        key: 'updateDependencies',
        value: function updateDependencies(_ref) {
            var session3 = _ref.session3;
            var q = _ref.event.query;
        }
    }]);

    return User3;
}();

var SimpleClass = exports.SimpleClass = function SimpleClass() {
    _classCallCheck(this, SimpleClass);
};

var User4 = exports.User4 = function () {
    function User4() {
        _classCallCheck(this, User4);
    }

    _createClass(User4, [{
        key: 'updateDependencies',
        value: function updateDependencies(_ref2) {
            var session4 = _ref2.session4;
            var query = _ref2.event.query;
        }
    }]);

    return User4;
}();

var User5 = exports.User5 = function () {
    function User5() {
        _classCallCheck(this, User5);
    }

    _createClass(User5, [{
        key: 'updatePage',
        value: function updatePage(_ref3) {
            var query = _ref3.event.query;
        }
    }]);

    return User5;
}();

var User6 = exports.User6 = function () {
    function User6() {
        _classCallCheck(this, User6);
    }

    _createClass(User6, [{
        key: 'updateFooter',
        value: function updateFooter(_ref4) {
            var definition = _ref4.definition;
            var request = _ref4.ClientRequest;
        }
    }]);

    return User6;
}();

Object.defineProperty(User6, "__diDefinitions", { value: { "User1": { "session1": "session1" }, "currentUser2": ["User22.factory", {}], "currentUser": ["User2.customFactory", { "session2": "session2" }],

        "User3": { "session3": "session3" }, "profileUser": ["User4.factory", { "session4": "session4" }], "User5": {}, "pageUser": ["User5.factory#updatePage", { "session5": "session5" }], "footerUser": ["User6.anotherFactory#updateFooter", { "ClientRequest": "ClientRequest" }]

    } });