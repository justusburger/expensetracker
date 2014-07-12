var ExpenseTracker;
(function (ExpenseTracker) {
    var Component = (function () {
        function Component() {
        }
        Object.defineProperty(Component.prototype, "injectorService", {
            get: function () {
                return this._injectorService || (this._injectorService = $('html').injector());
            },
            set: function (value) {
                this._injectorService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "authenticationService", {
            get: function () {
                return this._authenticationService || (this._authenticationService = this.injectorService.get(ExpenseTracker.Services.Authentication.Name));
            },
            set: function (value) {
                this._authenticationService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "isAuthenticated", {
            get: function () {
                return this.authenticationService.isAuthenticated;
            },
            enumerable: true,
            configurable: true
        });
        return Component;
    })();
    ExpenseTracker.Component = Component;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Conponent.js.map
