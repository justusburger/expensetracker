var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var ExpenseType = (function (_super) {
            __extends(ExpenseType, _super);
            function ExpenseType() {
                _super.call(this);
                this.expenseTypeResource = this.resourceService(this.apiBaseUrl + '/expense-type/:id');
            }
            ExpenseType.prototype.getAll = function () {
                var _this = this;
                var defer = this.promiseService.defer();
                this.expenseTypeResource.query(function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer);
                });
                return defer.promise;
            };

            ExpenseType.prototype.create = function (expenseType) {
                var _this = this;
                var defer = this.promiseService.defer();
                this.expenseTypeResource.save(expenseType, function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer);
                });
                return defer.promise;
            };

            ExpenseType.prototype.delete = function (id) {
                var _this = this;
                var defer = this.promiseService.defer();
                this.expenseTypeResource.delete({ id: id }, function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer);
                });
                return defer.promise;
            };
            ExpenseType.Name = 'ExpenseType';
            return ExpenseType;
        })(Services.ApiResource);
        Services.ExpenseType = ExpenseType;

        angular.module('ExpenseTracker.Services').factory(ExpenseType.Name, function () {
            return new ExpenseType();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ExpenseType.js.map
