﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var SignIn = (function (_super) {
            __extends(SignIn, _super);
            function SignIn() {
                _super.call(this);
                this.signInResource = this.resourceService(this.apiBaseUrl + '/sign-in');
            }
            Object.defineProperty(SignIn.prototype, "isSignedIn", {
                get: function () {
                    return this._isSignedIn;
                },
                set: function (value) {
                    this._isSignedIn = value;
                },
                enumerable: true,
                configurable: true
            });

            SignIn.prototype.create = function (signInRequest) {
                var _this = this;
                var defer = this.promiseService.defer();
                this.signInResource.save(signInRequest, function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer, [ExpenseTracker.Errors.SIGN_IN_INCORRECT_DETAILS]);
                });
                return defer.promise;
            };
            SignIn.Name = 'SignIn';
            return SignIn;
        })(Services.ApiResourceService);
        Services.SignIn = SignIn;

        angular.module('ExpenseTracker.Services').factory(SignIn.Name, function () {
            return new SignIn();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Authentication.js.map
