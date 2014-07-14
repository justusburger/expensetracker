var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var ApiResourceService = (function (_super) {
            __extends(ApiResourceService, _super);
            function ApiResourceService() {
                _super.call(this);
            }
            Object.defineProperty(ApiResourceService.prototype, "apiBaseUrl", {
                get: function () {
                    return this.injectorService.get('API_BASE_PATH');
                },
                enumerable: true,
                configurable: true
            });

            ApiResourceService.prototype.defaultOnError = function (response, defer, expectedErrors) {
                if (response.data && !Enumerable.From(expectedErrors).Contains(response.data.errorCode)) {
                    this.alertService.error(response.data.message);
                }
                defer.reject(response);
            };

            ApiResourceService.prototype.defaultOnSuccess = function (response, defer) {
                defer.resolve(response.data);
            };
            return ApiResourceService;
        })(ExpenseTracker.Component);
        Services.ApiResourceService = ApiResourceService;
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ApiResourceService.js.map
