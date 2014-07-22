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
                this.dates = {
                    from: null,
                    to: null
                };

                if (!attributes['source'])
                    throw new ExpenseTracker.ArgumentException('source', 'Grid date filter data provider property not set');

                this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);
            }
            DateFilter.prototype.filter = function () {
                if (this.dates.from && this.dates.to)
                    this.dataProvider.filter(DateFilter.Name, [{
                            field: 'date',
                            query: this.dates.from.toISOString() + '|' + this.dates.to.toISOString()
                        }]);
                else
                    this.dataProvider.filter(DateFilter.Name, []);
            };

            DateFilter.prototype.clear = function () {
                this.isCustom = false;
                var hadDate = !!this.dates.from && !!this.dates.to;
                this.dates.from = undefined;
                this.dates.to = undefined;
                if (hadDate)
                    this.filter();
            };

            Object.defineProperty(DateFilter.prototype, "isClear", {
                get: function () {
                    return !this.dates.from && !this.dates.to && !this.isCustom;
                },
                enumerable: true,
                configurable: true
            });

            DateFilter.prototype.today = function () {
                this.isCustom = false;
                var now = new Date();
                this.dates.from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                this.dates.to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
                this.filter();
            };

            Object.defineProperty(DateFilter.prototype, "isToday", {
                get: function () {
                    if (this.isClear || this.isCustom)
                        return false;

                    var now = new Date();
                    return this.dates.from.getTime() == (new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime() && this.dates.to.getTime() == (new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)).getTime();
                },
                enumerable: true,
                configurable: true
            });

            DateFilter.prototype.thisWeek = function () {
                this.isCustom = false;
                var now = new Date();
                var firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                var lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
                this.dates.from = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate());
                this.dates.to = new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate(), 23, 59, 59);
                this.filter();
            };

            Object.defineProperty(DateFilter.prototype, "isThisWeek", {
                get: function () {
                    if (this.isClear || this.isCustom)
                        return false;

                    var now = new Date();
                    var firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                    var lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
                    if (this.dates.from.getTime() !== (new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate())).getTime())
                        return false;
                    if (this.dates.to.getTime() !== (new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate(), 23, 59, 59)).getTime())
                        return false;
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            DateFilter.prototype.thisMonth = function () {
                this.isCustom = false;
                var now = new Date();
                this.dates.from = new Date(now.getFullYear(), now.getMonth());
                this.dates.to = new Date(now.getFullYear(), now.getMonth() + 1, -1, 23, 59, 59);
                this.filter();
            };

            Object.defineProperty(DateFilter.prototype, "isThisMonth", {
                get: function () {
                    if (this.isClear || this.isCustom)
                        return false;

                    var now = new Date();
                    return this.dates.from.getTime() == (new Date(now.getFullYear(), now.getMonth())).getTime() && this.dates.to.getTime() == (new Date(now.getFullYear(), now.getMonth() + 1, -1, 23, 59, 59)).getTime();
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
