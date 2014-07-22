var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var DateFilter = (function (_super) {
            __extends(DateFilter, _super);
            function DateFilter(scope, element, attributes) {
                _super.call(this, scope, element, attributes);

                if (!attributes['source'])
                    throw new ExpenseTracker.ArgumentException('source', 'Grid date filter data provider property not set');

                this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);
            }
            DateFilter.prototype.filter = function () {
                if (this.from && this.to)
                    this.dataProvider.filter(DateFilter.Name, [{
                            field: 'date',
                            query: this.from.toISOString() + '|' + this.to.toISOString()
                        }]);
                else
                    this.dataProvider.filter(DateFilter.Name, []);
            };

            DateFilter.prototype.clear = function () {
                var hadDate = !!this.from && !!this.to;
                this.from = undefined;
                this.to = undefined;
                if (hadDate)
                    this.filter();
            };

            Object.defineProperty(DateFilter.prototype, "isClear", {
                get: function () {
                    return !this.from && !this.to;
                },
                enumerable: true,
                configurable: true
            });

            DateFilter.prototype.today = function () {
                var now = new Date();
                this.from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                this.to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
                this.filter();
            };

            Object.defineProperty(DateFilter.prototype, "isToday", {
                get: function () {
                    if (this.isClear)
                        return false;

                    var now = new Date();
                    return this.from.getTime() == (new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime() && this.to.getTime() == (new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)).getTime();
                },
                enumerable: true,
                configurable: true
            });

            DateFilter.prototype.thisWeek = function () {
                var now = new Date();
                var firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                var lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
                this.from = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate());
                this.to = new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate(), 23, 59, 59);
                this.filter();
            };

            Object.defineProperty(DateFilter.prototype, "isThisWeek", {
                get: function () {
                    if (this.isClear)
                        return false;

                    var now = new Date();
                    var firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                    var lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
                    if (this.from.getTime() !== (new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate())).getTime())
                        return false;
                    if (this.to.getTime() !== (new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate(), 23, 59, 59)).getTime())
                        return false;
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            DateFilter.prototype.thisMonth = function () {
                var now = new Date();
                this.from = new Date(now.getFullYear(), now.getMonth());
                this.to = new Date(now.getFullYear(), now.getMonth() + 1, -1, 23, 59, 59);
                this.filter();
            };

            Object.defineProperty(DateFilter.prototype, "isThisMonth", {
                get: function () {
                    if (this.isClear)
                        return false;

                    var now = new Date();
                    return this.from.getTime() == (new Date(now.getFullYear(), now.getMonth())).getTime() && this.to.getTime() == (new Date(now.getFullYear(), now.getMonth() + 1, -1, 23, 59, 59)).getTime();
                },
                enumerable: true,
                configurable: true
            });
            DateFilter.Name = 'dateFilter';
            DateFilter.TemplateUrl = 'ExpenseTracker/Views/DateFilter.html';
            return DateFilter;
        })(ExpenseTracker.DirectiveBase);
        Directives.DateFilter = DateFilter;

        angular.module('ExpenseTracker.Directives').directive(DateFilter.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: DateFilter.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new DateFilter(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=DateFilter.js.map
