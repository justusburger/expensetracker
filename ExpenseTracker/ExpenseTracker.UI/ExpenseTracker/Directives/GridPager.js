var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var GridPager = (function (_super) {
            __extends(GridPager, _super);
            function GridPager(scope, element, attributes) {
                _super.call(this, scope, element, attributes);

                if (!attributes['source'])
                    throw new ExpenseTracker.ArgumentException('source', 'Grid pager data provider property not set');

                this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);
            }
            Object.defineProperty(GridPager.prototype, "pages", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return [];
                    var results = [];
                    if (this.last < 5) {
                        for (var i = 0; i < this.last; i++)
                            results.push(i + 1);
                    } else {
                        for (var i = 0; i < 5; i++) {
                            var page = this.currentPage + (-2 + i);
                            if (page > 0 && page <= this.last)
                                results.push(page);
                        }
                    }
                    return results;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPager.prototype, "currentPage", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return null;
                    return this.dataProvider.query.page;
                },
                enumerable: true,
                configurable: true
            });

            GridPager.prototype.setPage = function (page) {
                if (!this.dataProvider || !this.dataProvider.query)
                    return;
                this.dataProvider.setPage(page);
            };

            Object.defineProperty(GridPager.prototype, "showPrevious", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return false;
                    return this.currentPage > 1;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPager.prototype, "showNext", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return false;
                    return this.currentPage < this.last;
                },
                enumerable: true,
                configurable: true
            });

            GridPager.prototype.previous = function () {
                if (!this.showPrevious)
                    return;
                this.dataProvider.setPage(this.currentPage - 1);
            };

            GridPager.prototype.next = function () {
                if (!this.showNext)
                    return;
                this.dataProvider.setPage(this.currentPage + 1);
            };

            Object.defineProperty(GridPager.prototype, "showFirst", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return false;
                    return this.pages.first() > 1;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPager.prototype, "showFirstEllipse", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return false;
                    return this.pages.first() > 2;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPager.prototype, "showLast", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return false;
                    return this.pages.last() < this.last;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPager.prototype, "showLastEllipse", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return false;
                    return this.pages.last() < (this.last - 1);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPager.prototype, "last", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return 0;
                    return this.dataProvider.query.pageCount;
                },
                enumerable: true,
                configurable: true
            });
            GridPager.Name = 'gridPager';
            GridPager.TemplateUrl = 'ExpenseTracker/Views/GridPager.html';
            return GridPager;
        })(ExpenseTracker.DirectiveBase);
        Directives.GridPager = GridPager;

        angular.module('ExpenseTracker.Directives').directive(GridPager.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: GridPager.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new GridPager(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=GridPager.js.map
