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
                var _this = this;
                _super.call(this, scope);
                this.form = {};

                this.removeConfirmationPopup = {
                    title: 'Remove expense',
                    text: 'Are you sure you want to remove <strong>{{ description }}</strong>?',
                    style: 1 /* Danger */,
                    size: 1 /* Small */,
                    buttons: [
                        { text: 'Cancel' },
                        {
                            text: 'Remove',
                            style: 1 /* Danger */,
                            clickFn: function (expense) {
                                return _this.removeConfirmed(expense);
                            }
                        }
                    ]
                };

                this.expenseDataProvider = this.dataProviderFactory.create(function (query) {
                    return _this.expenseService.getAll(query);
                });
            }
            Object.defineProperty(ExpenseList.prototype, "isSecured", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            ExpenseList.prototype.initialize = function () {
                var _this = this;
                return _super.prototype.initialize.call(this).then(function () {
                    return _this.expenseDataProvider.reset();
                });
            };

            ExpenseList.prototype.remove = function (expense) {
                this.popupService.show(this.removeConfirmationPopup, expense);
            };

            ExpenseList.prototype.removeConfirmed = function (expense) {
                var _this = this;
                this.beginUpdate();
                this.expenseService.delete(expense.id).then(function () {
                    _this.endUpdate();
                    _this.expenseDataProvider.refresh();
                    _this.alertService.success('Expense removed');
                }, function () {
                    return _this.endUpdate();
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
