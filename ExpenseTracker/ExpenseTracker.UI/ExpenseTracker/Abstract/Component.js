var ExpenseTracker;
(function (ExpenseTracker) {
    var Component = (function () {
        function Component() {
            var _this = this;
            this._loadingStack = [];
            this.cacheService.initializeDefer.promise.then(function () {
                return _this.onInitialized();
            });
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

        Object.defineProperty(Component.prototype, "signInService", {
            get: function () {
                return this._signInService || (this._signInService = this.injectorService.get(ExpenseTracker.Services.SignIn.Name));
            },
            set: function (value) {
                this._signInService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "profileService", {
            get: function () {
                return this._profileService || (this._profileService = this.injectorService.get(ExpenseTracker.Services.Profile.Name));
            },
            set: function (value) {
                this._profileService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "expenseTypeService", {
            get: function () {
                return this._expenseTypeService || (this._expenseTypeService = this.injectorService.get(ExpenseTracker.Services.ExpenseType.Name));
            },
            set: function (value) {
                this._expenseTypeService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "expenseService", {
            get: function () {
                return this._expenseService || (this._expenseService = this.injectorService.get(ExpenseTracker.Services.Expense.Name));
            },
            set: function (value) {
                this._expenseService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "registrationService", {
            get: function () {
                return this._registrationService || (this._registrationService = this.injectorService.get(ExpenseTracker.Services.Registration.Name));
            },
            set: function (value) {
                this._registrationService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "popupService", {
            get: function () {
                return this._popupService || (this._popupService = this.injectorService.get(ExpenseTracker.Services.Popup.Name));
            },
            set: function (value) {
                this._popupService = value;
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

        Object.defineProperty(Component.prototype, "resourceService", {
            get: function () {
                return this._resourceService || (this._resourceService = this.injectorService.get('$resource'));
            },
            set: function (value) {
                this._resourceService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "timeoutService", {
            get: function () {
                return this._timeoutService || (this._timeoutService = this.injectorService.get('$timeout'));
            },
            set: function (value) {
                this._timeoutService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "locationService", {
            get: function () {
                return this._locationService || (this._locationService = this.injectorService.get('$location'));
            },
            set: function (value) {
                this._locationService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "sceService", {
            get: function () {
                return this._sceService || (this._sceService = this.injectorService.get('$sce'));
            },
            set: function (value) {
                this._sceService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "interpolateService", {
            get: function () {
                return this._interpolateService || (this._interpolateService = this.injectorService.get('$interpolate'));
            },
            set: function (value) {
                this._interpolateService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "alertService", {
            get: function () {
                return this._alertService || (this._alertService = this.injectorService.get(ExpenseTracker.Services.Alert.Name));
            },
            set: function (value) {
                this._alertService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "cacheService", {
            get: function () {
                return this._cacheService || (this._cacheService = this.injectorService.get(ExpenseTracker.Services.Cache.Name));
            },
            set: function (value) {
                this._cacheService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "isSignedIn", {
            get: function () {
                return !!this.cacheService.profile;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "profile", {
            get: function () {
                return this.cacheService.profile;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "isLoading", {
            get: function () {
                return Enumerable.From(this._loadingStack).Any();
            },
            enumerable: true,
            configurable: true
        });
        Component.prototype.beginUpdate = function () {
            this._loadingStack.push(true);
        };
        Component.prototype.endUpdate = function () {
            this._loadingStack.pop();
        };

        Component.prototype.onInitialized = function () {
        };
        return Component;
    })();
    ExpenseTracker.Component = Component;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Component.js.map
