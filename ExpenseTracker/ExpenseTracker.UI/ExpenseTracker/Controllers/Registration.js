var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var Registration = (function (_super) {
            __extends(Registration, _super);
            function Registration(scope) {
                _super.call(this, scope);
                this.form = {};
            }
            Registration.prototype.register = function () {
                var _this = this;
                this.registrationService.create(this.form).then(function () {
                    _this.locationService.path('/registration-complete');
                });
            };
            Registration.Name = 'Registration';
            return Registration;
        })(ExpenseTracker.ControllerBase);
        Controllers.Registration = Registration;

        angular.module('ExpenseTracker.Controllers').controller(Registration.Name, [
            '$scope',
            function (scope) {
                return new Registration(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Registration.js.map
