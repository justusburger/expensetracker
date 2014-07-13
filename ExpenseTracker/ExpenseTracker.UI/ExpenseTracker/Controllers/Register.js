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
                scope['name'] = 'Justus';
            }
            Register.prototype.register = function () {
                console.log(this.form);
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
