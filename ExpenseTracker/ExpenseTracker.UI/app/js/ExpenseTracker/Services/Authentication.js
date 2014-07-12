var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var Authentication = (function (_super) {
            __extends(Authentication, _super);
            function Authentication() {
                _super.call(this);
            }
            Object.defineProperty(Authentication.prototype, "authenticationToken", {
                get: function () {
                    return this._authenticationToken;
                },
                set: function (value) {
                    this._authenticationToken = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Authentication.prototype, "isAuthenticated", {
                get: function () {
                    return !!this._authenticationToken;
                },
                enumerable: true,
                configurable: true
            });
            Authentication.Name = 'Authentication';
            return Authentication;
        })(ExpenseTracker.Component);
        Services.Authentication = Authentication;

        angular.module('ExpenseTracker.Services').factory(Authentication.Name, function () {
            return new Authentication();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Authentication.js.map
