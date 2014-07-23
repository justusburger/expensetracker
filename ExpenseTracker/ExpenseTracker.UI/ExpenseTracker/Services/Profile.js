var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var Profile = (function (_super) {
            __extends(Profile, _super);
            function Profile() {
                _super.call(this);
                this.profileResource = this.resourceService(this.apiBaseUrl + '/profile', null, {
                    getFullProfile: { method: 'GET', url: this.apiBaseUrl + '/profile/full' },
                    update: { method: 'PUT' }
                });
            }
            Profile.prototype.get = function () {
                var _this = this;
                var defer = this.promiseService.defer();
                this.profileResource.get(function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer, [ExpenseTracker.Errors.UNAUTHENTICATED]);
                });
                return defer.promise;
            };

            Profile.prototype.getFullProfile = function () {
                var _this = this;
                var defer = this.promiseService.defer();
                this.profileResource.getFullProfile(function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer);
                });
                return defer.promise;
            };

            Profile.prototype.update = function (profile) {
                var _this = this;
                var defer = this.promiseService.defer();
                this.profileResource.update(profile, function (response) {
                    return _this.defaultOnSuccess(response, defer);
                }, function (response) {
                    return _this.defaultOnError(response, defer);
                });
                return defer.promise;
            };
            Profile.Name = 'Profile';
            return Profile;
        })(Services.ApiResource);
        Services.Profile = Profile;

        angular.module('ExpenseTracker.Services').factory(Profile.Name, function () {
            return new Profile();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Profile.js.map
