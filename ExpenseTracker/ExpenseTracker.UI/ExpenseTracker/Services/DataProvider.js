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
                this.selectorFn = selectorFn;
                this.pageSize = 2;
            }
            DataProvider.prototype.reset = function () {
                this.load({
                    page: 1,
                    pageSize: this.pageSize
                });
            };

            DataProvider.prototype.initialize = function () {
                this.reset();
            };

            DataProvider.prototype.load = function (query) {
                var _this = this;
                this.beginUpdate();
                this.selectorFn(query).then(function (results) {
                    _this.items = results.items;
                    _this.query = results.query;
                    _this.endUpdate();
                });
            };

            DataProvider.prototype.setPage = function (page) {
                this.load({
                    page: page,
                    pageSize: this.pageSize
                });
            };
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
