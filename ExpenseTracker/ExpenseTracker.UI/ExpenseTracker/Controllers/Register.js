var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var Register = (function (_super) {
            __extends(Register, _super);
            function Register(scope) {
                _super.call(this, scope);
                this.form = {};
                this.form = {
                    name: 'Justus Burger',
                    email: 'justusburger@gmail.com',
                    password: 'P@ssw0rd',
                    acceptTermsAndConditions: true,
                    newsletterSignup: false
                };
            }
            Register.prototype.register = function () {
                this.registrationService.register(this.form).then(function (response) {
                    console.log('Done in controller', response);
                });
            };
            Register.Name = 'Register';
            return Register;
        })(ExpenseTracker.ControllerBase);
        Controllers.Register = Register;

        angular.module('ExpenseTracker.Controllers').controller(Register.Name, [
            '$scope',
            function (scope) {
                return new Register(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Register.js.map
