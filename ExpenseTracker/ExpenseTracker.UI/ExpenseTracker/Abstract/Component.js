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

        Object.defineProperty(Component.prototype, "promiseService", {
            get: function () {
                return this._promiseService || (this._promiseService = this.injectorService.get('$q'));
            },
            set: function (value) {
                this._promiseService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "httpService", {
            get: function () {
                return this._httpService || (this._httpService = this.injectorService.get('$http'));
            },
            set: function (value) {
                this._httpService = value;
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
//# sourceMappingURL=Component.js.map
