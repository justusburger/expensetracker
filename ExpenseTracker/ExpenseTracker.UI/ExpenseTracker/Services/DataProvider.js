var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var DataProvider = (function (_super) {
            __extends(DataProvider, _super);
            function DataProvider(selectorFn) {
                _super.call(this);
                this._filters = {};
                this.selectorFn = selectorFn;
                this.query = this.defaultQuery;
            }
            Object.defineProperty(DataProvider.prototype, "defaultQuery", {
                get: function () {
                    return {
                        page: 1,
                        pageSize: 20,
                        filters: this.filters
                    };
                },
                enumerable: true,
                configurable: true
            });

            DataProvider.prototype.reset = function () {
                this.load(this.defaultQuery);
            };

            DataProvider.prototype.refresh = function () {
                this.load({
                    page: this.query.page,
                    pageSize: this.query.pageSize,
                    filters: this.filters
                });
            };

            DataProvider.prototype.load = function (query) {
                var _this = this;
                this.beginUpdate();
                this.selectorFn(query).then(function (results) {
                    _this.queryResults = results;
                    _this.items = results.items;
                    _this.query = results.query;
                    _this.endUpdate();
                });
            };

            DataProvider.prototype.download = function () {
                var _this = this;
                var query = {
                    page: this.query.page,
                    pageSize: this.query.pageSize,
                    filters: this.filters,
                    download: true
                };
                this.beginUpdate();
                this.selectorFn(query).then(function (results) {
                    return _this.endUpdate();
                });
            };

            DataProvider.prototype.setPage = function (page) {
                this.load({
                    page: page,
                    pageSize: this.query.pageSize,
                    filters: this.filters
                });
            };

            DataProvider.prototype.filter = function (source, filters) {
                this._filters[source] = filters;
                this.load({
                    page: this.query.page,
                    pageSize: this.query.pageSize,
                    filters: this.filters
                });
            };

            Object.defineProperty(DataProvider.prototype, "filters", {
                get: function () {
                    var results = [];
                    for (var source in this._filters) {
                        var sourceFilters = this._filters[source];
                        if (sourceFilters && sourceFilters.any()) {
                            sourceFilters.forEach(function (sourceFilter) {
                                if (typeof sourceFilter.query !== 'undefined' && sourceFilter.query !== null && sourceFilter.query.toString().trim() !== '')
                                    results.push(sourceFilter.field + ':' + sourceFilter.query.split(':').join('>'));
                            });
                        }
                    }
                    return results;
                },
                enumerable: true,
                configurable: true
            });
            return DataProvider;
        })(ExpenseTracker.Component);
        Services.DataProvider = DataProvider;

        var DataProviderFactory = (function () {
            function DataProviderFactory() {
            }
            DataProviderFactory.prototype.create = function (selectorFn) {
                return new DataProvider(selectorFn);
            };
            DataProviderFactory.Name = 'DataProvider';
            return DataProviderFactory;
        })();
        Services.DataProviderFactory = DataProviderFactory;

        angular.module('ExpenseTracker.Services').factory(DataProviderFactory.Name, function () {
            return new DataProviderFactory();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=DataProvider.js.map
