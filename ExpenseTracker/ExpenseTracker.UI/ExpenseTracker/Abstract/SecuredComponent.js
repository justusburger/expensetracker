var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    var SecuredComponent = (function (_super) {
        __extends(SecuredComponent, _super);
        function SecuredComponent() {
            _super.call(this);
        }
        Object.defineProperty(SecuredComponent.prototype, "isSecured", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });

        SecuredComponent.prototype.initialize = function () {
            var _this = this;
            return _super.prototype.initialize.call(this).then(function () {
                if (_this.isSecured && !_this.isSignedIn) {
                    _this.locationService.path('/sign-in');
                    return _this.promiseService.reject();
                }
            });
        };
        return SecuredComponent;
    })(ExpenseTracker.Component);
    ExpenseTracker.SecuredComponent = SecuredComponent;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=SecuredComponent.js.map
