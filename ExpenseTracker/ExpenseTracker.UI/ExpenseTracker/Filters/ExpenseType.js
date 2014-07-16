var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Filters) {
        var ExpenseType = (function (_super) {
            __extends(ExpenseType, _super);
            function ExpenseType() {
                _super.apply(this, arguments);
            }
            ExpenseType.prototype.filter = function (value, expenseTypes) {
                var _this = this;
                if (typeof value == 'undefined' || value == null || !angular.isNumber(value) || !Enumerable.From(expenseTypes).Any())
                    return undefined;

                if (typeof this.cacheService.expenseTypeNameDictionary[value] === 'undefined')
                    Enumerable.From(expenseTypes).ForEach(function (e) {
                        return _this.cacheService.expenseTypeNameDictionary[e.id] = e.title;
                    });

                return this.cacheService.expenseTypeNameDictionary[value];
            };
            ExpenseType.Name = "expenseType";
            return ExpenseType;
        })(ExpenseTracker.Component);
        Filters.ExpenseType = ExpenseType;

        angular.module('ExpenseTracker.Filters').filter(ExpenseType.Name, function () {
            var handler = new ExpenseType();
            return function (value, expenseTypes) {
                return handler.filter(value, expenseTypes);
            };
        });
    })(ExpenseTracker.Filters || (ExpenseTracker.Filters = {}));
    var Filters = ExpenseTracker.Filters;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ExpenseType.js.map
