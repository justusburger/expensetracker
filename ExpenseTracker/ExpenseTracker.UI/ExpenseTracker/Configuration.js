angular.module('ExpenseTracker.Services', []);
angular.module('ExpenseTracker.Controllers', []);
angular.module('ExpenseTracker.Directives', []);
angular.module('ExpenseTracker', ['ngRoute', 'ExpenseTracker.Services', 'ExpenseTracker.Controllers', 'ExpenseTracker.Directives']).config([
    '$routeProvider', function (routeProvider) {
        routeProvider.when('/register', { controller: ExpenseTracker.Controllers.Register.Name, templateUrl: 'ExpenseTracker/Views/Register.html' }).otherwise({ controller: ExpenseTracker.Controllers.Home.Name, templateUrl: 'ExpenseTracker/Views/Home.html' });
    }]);
//# sourceMappingURL=Configuration.js.map
