var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var Expense = (function (_super) {
            __extends(Expense, _super);
            function Expense() {
                _super.call(this);
                this.expenseResource = this.resourceService(this.apiBaseUrl + '/expense/:id', null, {
                    update: { method: 'PUT' },
                    getAllTags: { method: 'GET', url: this.apiBaseUrl + '/expense/tags', isArray: true },
                    query: { method: 'GET' }
                });
            }
            Expense.prototype.getAll = function (query) {
                var _this = this;
                var defer = this.promiseService.defer();

                if (query.download) {
                    this.httpService({ method: 'GET', url: this.apiBaseUrl + '/expense/', params: query }).success(function (data, status, headers) {
                        _this.downloadHelperService.download(data, status, headers);
                        defer.resolve(data);
                    }).error(function (data) {
                        return _this.defaultOnError(data, defer);
                    });
                } else {
                    this.expenseResource.query(query, function (response) {
                        return _this.defaultOnSuccess(response, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                }
                return defer.promise;
            };

            Expense.prototype.getById = function (id) {
                var _this = this;
                var defer = this.promiseService.defer();
                this.expenseResource.get({ id: id }, function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer);
                });
                return defer.promise;
            };

            Expense.prototype.create = function (expense) {
                var _this = this;
                var defer = this.promiseService.defer();
                this.expenseResource.save(expense, function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer);
                });
                return defer.promise;
            };

            Expense.prototype.update = function (expense) {
                var _this = this;
                var defer = this.promiseService.defer();
                this.expenseResource.update(expense, function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer);
                });
                return defer.promise;
            };

            Expense.prototype.delete = function (id) {
                var _this = this;
                var defer = this.promiseService.defer();
                this.expenseResource.delete({ id: id }, function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer);
                });
                return defer.promise;
            };

            Expense.prototype.getAllTags = function () {
                var _this = this;
                var defer = this.promiseService.defer();
                this.expenseResource.getAllTags(function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer);
                });
                return defer.promise;
            };
            Expense.Name = 'Expense';
            return Expense;
        })(Services.ApiResource);
        Services.Expense = Expense;

        angular.module('ExpenseTracker.Services').factory(Expense.Name, function () {
            return new Expense();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Expense.js.map
