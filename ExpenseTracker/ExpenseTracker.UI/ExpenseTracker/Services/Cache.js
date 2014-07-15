var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var Cache = (function () {
            function Cache(promiseService) {
                this._data = {};
                this.initializeDefer = promiseService.defer();
            }
            Object.defineProperty(Cache.prototype, "profile", {
                get: function () {
                    return this._profile;
                },
                set: function (value) {
                    this._profile = value;
                },
                enumerable: true,
                configurable: true
            });
            Cache.Name = "Cache";
            return Cache;
        })();
        Services.Cache = Cache;

        angular.module('ExpenseTracker.Services').factory(Cache.Name, ['$q', function (promiseService) {
                return new Cache(promiseService);
            }]);
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Cache.js.map
