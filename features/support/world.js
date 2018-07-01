// features/support/world.js
var { setDefaultTimeout, setWorldConstructor } = require("cucumber");

setDefaultTimeout(60 * 1000);

var CustomWorld = function () { };

CustomWorld.prototype = {
    _accessToken: undefined,
    get accessToken() {
        return this._accessToken;
    },
    set accessToken(value) {
        this._accessToken = value
    }
};

setWorldConstructor(CustomWorld);