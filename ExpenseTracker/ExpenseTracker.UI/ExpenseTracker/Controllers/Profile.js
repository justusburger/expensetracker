var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var Profile = (function (_super) {
            __extends(Profile, _super);
            function Profile(scope) {
                _super.call(this, scope);
                this.beginUpdate();
            }
            Object.defineProperty(Profile.prototype, "isSecured", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            Profile.prototype.initialize = function () {
                var _this = this;
                return _super.prototype.initialize.call(this).then(function () {
                    _this.profileService.getFullProfile().then(function (profile) {
                        _this.form = profile;
                        _this.endUpdate();
                    }, function () {
                        return _this.endUpdate();
                    });
                });
            };

            Profile.prototype.save = function () {
                var _this = this;
                this.beginUpdate();
                this.profileService.update(this.form).then(function (newProfile) {
                    _this.cacheService.profile = newProfile;
                    _this.profileForm.$setPristine();
                    _this.alertService.success("Profile updated");
                    _this.endUpdate();
                }, function () {
                    return _this.endUpdate();
                });
            };

            Object.defineProperty(Profile.prototype, "profileForm", {
                get: function () {
                    return this.scope['profileForm'];
                },
                enumerable: true,
                configurable: true
            });
            Profile.Name = 'Profile';
            return Profile;
        })(ExpenseTracker.ControllerBase);
        Controllers.Profile = Profile;

        angular.module('ExpenseTracker.Controllers').controller(Profile.Name, [
            '$scope',
            function (scope) {
                return new Profile(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Profile.js.map
