var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    var SecuredController = (function (_super) {
        __extends(SecuredController, _super);
        function SecuredController(scope) {
            _super.call(this, scope);
        }
        Object.defineProperty(SecuredController.prototype, "isSecured", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });

        SecuredController.prototype.initialize = function () {
            var _this = this;
            return _super.prototype.initialize.call(this).then(function () {
                if (_this.isSecured && !_this.isSignedIn) {
                    _this.locationService.path('/sign-in');
                    return _this.promiseService.reject();
                }
            });
        };
        return SecuredController;
    })(ExpenseTracker.ControllerBase);
    ExpenseTracker.SecuredController = SecuredController;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=SecuredController.js.map
