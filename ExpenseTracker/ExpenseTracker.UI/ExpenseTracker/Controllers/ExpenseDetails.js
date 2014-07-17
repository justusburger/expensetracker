var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var ExpenseDetails = (function (_super) {
            __extends(ExpenseDetails, _super);
            function ExpenseDetails(scope) {
                _super.call(this, scope);
                this.form = {};
            }
            ExpenseDetails.prototype.onInitialized = function () {
                var _this = this;
                this.beginUpdate();
                this.expenseTypeService.getAll().then(function (expenseTypes) {
                    _this.expenseTypes = expenseTypes;
                    _this.endUpdate();
                }, function () {
                    return _this.endUpdate();
                });
            };

            ExpenseDetails.prototype.add = function () {
                var _this = this;
                this.beginUpdate();
                this.expenseService.create(this.form).then(function () {
                    _this.alertService.success("Expense added");
                    _this.locationService.path("/expenses");
                }, function () {
                    return _this.endUpdate();
                });
            };
            ExpenseDetails.Name = 'ExpenseDetails';
            return ExpenseDetails;
        })(ExpenseTracker.ControllerBase);
        Controllers.ExpenseDetails = ExpenseDetails;

        angular.module('ExpenseTracker.Controllers').controller(ExpenseDetails.Name, [
            '$scope',
            function (scope) {
                return new ExpenseDetails(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ExpenseDetails.js.map
