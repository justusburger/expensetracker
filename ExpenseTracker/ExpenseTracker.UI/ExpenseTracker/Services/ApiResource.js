var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var ApiResource = (function (_super) {
            __extends(ApiResource, _super);
            function ApiResource() {
                _super.call(this);
            }
            ApiResource.prototype.defaultOnError = function (response, defer, expectedErrors) {
                if (response.data && !Enumerable.From(expectedErrors).Contains(response.data.errorCode)) {
                    if (response.status === 401) {
                        this.cacheService.profile = undefined;
                        this.locationService.path('/sign-in/expired');
                    } else {
                        this.alertService.error('An unexpected error occured: ' + response.data.message);
                    }
                }
                defer.reject(response);
            };

            ApiResource.prototype.defaultOnSuccess = function (response, defer) {
                defer.resolve(response);
            };
            return ApiResource;
        })(ExpenseTracker.Component);
        Services.ApiResource = ApiResource;
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ApiResource.js.map
