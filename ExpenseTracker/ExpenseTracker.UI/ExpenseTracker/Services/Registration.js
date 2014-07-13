var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var Registration = (function (_super) {
            __extends(Registration, _super);
            function Registration() {
                _super.call(this);
                this.registerResource = this.resourceService(this.apiBaseUrl + '/registration/');
            }
            Registration.prototype.register = function (form) {
                var _this = this;
                var defer = this.promiseService.defer();
                this.registerResource.save(form, function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer);
                });
                return defer.promise;
            };
            Registration.Name = 'Registration';
            return Registration;
        })(Services.ApiResourceService);
        Services.Registration = Registration;

        angular.module('ExpenseTracker.Services').factory(Registration.Name, function () {
            return new Registration();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Registration.js.map
