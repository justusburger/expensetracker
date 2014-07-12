angular.module('ExpenseTracker.Services', []);
angular.module('ExpenseTracker.Controllers', []);
angular.module('ExpenseTracker.Directives', []);
angular.module('ExpenseTracker', ['ngRoute', 'ExpenseTracker.Services', 'ExpenseTracker.Controllers', 'ExpenseTracker.Directives']).config([
    '$routeProvider', function (routeProvider) {
        routeProvider.otherwise({
            controller: 'Home',
            templateUrl: 'js/ExpenseTracker/Views/Home.html'
        });
    }]);
//# sourceMappingURL=Configuration.js.map
