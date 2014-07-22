var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var GridTextFilter = (function (_super) {
            __extends(GridTextFilter, _super);
            function GridTextFilter(scope, element, attributes) {
                var _this = this;
                _super.call(this, scope, element, attributes);

                if (!attributes['source'])
                    throw new ExpenseTracker.ArgumentException('source', 'Grid text filter data provider property not set');

                this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);

                if (!attributes['filterFields'])
                    throw new ExpenseTracker.ArgumentException('filterFields', 'Grid text filter filter fields property not set');

                this.filterFields = attributes['filterFields'].split(' ');

                this.scope.$watch(function () {
                    return _this.text;
                }, function (text, oldText) {
                    if (typeof text === 'undefined' && typeof oldText === 'undefined')
                        return;
                    _this.filter();
                });
            }
            GridTextFilter.prototype.filter = function () {
                this.dataProvider.filter(GridTextFilter.Name, this.filters(this.text));
            };

            GridTextFilter.prototype.filters = function (query) {
                var filters = [];
                this.filterFields.forEach(function (field) {
                    filters.push({
                        field: field,
                        query: query
                    });
                });
                return filters;
            };

            GridTextFilter.prototype.clear = function () {
                var hadText = !!this.text;
                this.text = '';
                if (hadText)
                    this.filter();
            };
            GridTextFilter.Name = 'gridTextFilter';
            GridTextFilter.TemplateUrl = 'ExpenseTracker/Views/GridTextFilter.html';
            return GridTextFilter;
        })(ExpenseTracker.DirectiveBase);
        Directives.GridTextFilter = GridTextFilter;

        angular.module('ExpenseTracker.Directives').directive(GridTextFilter.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: GridTextFilter.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new GridTextFilter(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=GridTextFilter.js.map
