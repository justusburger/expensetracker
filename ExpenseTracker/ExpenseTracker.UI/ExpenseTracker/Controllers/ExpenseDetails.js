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
            }
            Object.defineProperty(ExpenseDetails.prototype, "isEditing", {
                get: function () {
                    return !!this.expenseId;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ExpenseDetails.prototype, "expenseId", {
                get: function () {
                    return this.routeParamsService['id'];
                },
                enumerable: true,
                configurable: true
            });

            ExpenseDetails.prototype.onInitialized = function () {
                var _this = this;
                if (this.isEditing) {
                    this.beginUpdate();
                    this.expenseService.getById(this.expenseId).then(function (expense) {
                        _this.form = expense;
                        _this.endUpdate();
                    }, function () {
                        return _this.endUpdate();
                    });
                } else
                    this.form = {};

                this.beginUpdate('tags');
                this.expenseService.getAllTags().then(function (tags) {
                    _this.tags = tags;
                    _this.endUpdate('tags');
                }, function () {
                    return _this.endUpdate('tags');
                });
            };

            ExpenseDetails.prototype.save = function () {
                var _this = this;
                if (this.isEditing) {
                    this.beginUpdate();
                    this.expenseService.update(this.form).then(function () {
                        _this.alertService.success("Expense updated");
                        _this.locationService.path("/expenses");
                    }, function () {
                        return _this.endUpdate();
                    });
                } else {
                    this.beginUpdate();
                    this.expenseService.create(this.form).then(function () {
                        _this.alertService.success("Expense added");
                        _this.locationService.path("/expenses");
                    }, function () {
                        return _this.endUpdate();
                    });
                }
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
