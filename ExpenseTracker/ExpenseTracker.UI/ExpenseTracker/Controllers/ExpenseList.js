var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var ExpenseList = (function (_super) {
            __extends(ExpenseList, _super);
            function ExpenseList(scope) {
                _super.call(this, scope);
                this.form = {};
            }
            ExpenseList.prototype.onInitialized = function () {
                var _this = this;
                this.beginUpdate();
                this.expenseService.getAll().then(function (expenses) {
                    _this.expenses = expenses;
                    _this.endUpdate();
                });
                this.beginUpdate();
                this.expenseTypeService.getAll().then(function (expenseTypes) {
                    _this.expenseTypes = expenseTypes;
                    _this.endUpdate();
                });
            };
            ExpenseList.Name = 'ExpenseList';
            return ExpenseList;
        })(ExpenseTracker.ControllerBase);
        Controllers.ExpenseList = ExpenseList;

        angular.module('ExpenseTracker.Controllers').controller(ExpenseList.Name, [
            '$scope',
            function (scope) {
                return new ExpenseList(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ExpenseList.js.map
