var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var Expenses = (function (_super) {
            __extends(Expenses, _super);
            function Expenses(scope) {
                _super.call(this, scope);
                this.form = {};
            }
            Expenses.Name = 'Expenses';
            return Expenses;
        })(ExpenseTracker.ControllerBase);
        Controllers.Expenses = Expenses;

        angular.module('ExpenseTracker.Controllers').controller(Expenses.Name, [
            '$scope',
            function (scope) {
                return new Expenses(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Expenses.js.map
