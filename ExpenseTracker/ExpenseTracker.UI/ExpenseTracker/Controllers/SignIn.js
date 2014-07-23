var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var SignIn = (function (_super) {
            __extends(SignIn, _super);
            function SignIn(scope) {
                _super.call(this, scope);
                this.form = {};
                this.form = {
                    email: 'justusburger@gmail.com',
                    password: 'P@ssw0rd',
                    rememberMe: true
                };
            }
            SignIn.prototype.signIn = function () {
                var _this = this;
                this.beginUpdate();
                this.signInService.signIn(this.form).then(function (profile) {
                    _this.endUpdate();
                    _this.cacheService.profile = profile;
                    _this.locationService.path('/expenses');
                }, function (response) {
                    _this.endUpdate();
                    if (response.data.errorCode === ExpenseTracker.Errors.SIGN_IN_INCORRECT_DETAILS)
                        _this.alertService.error("Incorrect sign in details. Please try again.");
                    if (response.data.errorCode === ExpenseTracker.Errors.SIGN_IN_ACCOUNT_LOCKED)
                        _this.alertService.error("Your account is locked. Please contact support.");
                });
            };

            Object.defineProperty(SignIn.prototype, "sessionExpired", {
                get: function () {
                    return this.routeParamsService['expired'] === 'expired';
                },
                enumerable: true,
                configurable: true
            });
            SignIn.Name = 'SignIn';
            return SignIn;
        })(ExpenseTracker.ControllerBase);
        Controllers.SignIn = SignIn;

        angular.module('ExpenseTracker.Controllers').controller(SignIn.Name, [
            '$scope',
            function (scope) {
                return new SignIn(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=SignIn.js.map
