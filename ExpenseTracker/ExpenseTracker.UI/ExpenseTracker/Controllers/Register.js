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
            function Register() {
                _super.call(this);
                this.form = {};
            }
            Register.Name = 'Register';
            return Register;
        })(ExpenseTracker.ControllerBase);
        Controllers.Register = Register;

        angular.module('ExpenseTracker.Controllers').controller(Register.Name, function () {
            return new Register();
        });
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Register.js.map
