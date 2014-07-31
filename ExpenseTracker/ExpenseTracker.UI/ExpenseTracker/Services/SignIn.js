var __extends = this.__extends || function (d, b) {
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
            SignIn.prototype.signIn = function (signInRequest) {
                var _this = this;
                var defer = this.promiseService.defer();
                this.signInResource.save(signInRequest, function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer, [ExpenseTracker.Errors.SIGN_IN_INCORRECT_DETAILS, ExpenseTracker.Errors.SIGN_IN_ACCOUNT_LOCKED, ExpenseTracker.Errors.SIGN_IN_EMAIL_NOT_VERIFIED]);
                });
                return defer.promise;
            };

            SignIn.prototype.signOut = function () {
                var _this = this;
                var defer = this.promiseService.defer();
                this.signInResource.delete(function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer);
                });
                return defer.promise;
            };
            SignIn.Name = 'SignIn';
            return SignIn;
        })(Services.ApiResource);
        Services.SignIn = SignIn;

        angular.module('ExpenseTracker.Services').factory(SignIn.Name, function () {
            return new SignIn();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=SignIn.js.map
