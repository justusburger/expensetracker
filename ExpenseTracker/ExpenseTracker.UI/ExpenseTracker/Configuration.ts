angular.module('ExpenseTracker.Services', []);
angular.module('ExpenseTracker.Controllers', []);
angular.module('ExpenseTracker.Directives', []);
angular.module('ExpenseTracker', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ExpenseTracker.Services', 'ExpenseTracker.Controllers', 'ExpenseTracker.Directives'])
    .config([
        '$routeProvider',
        (routeProvider: ng.route.IRouteProvider) => {
            routeProvider
                .when('/registration', { controller: ExpenseTracker.Controllers.Registration.Name, templateUrl: 'ExpenseTracker/Views/Registration.html' })
                .otherwise({ controller: ExpenseTracker.Controllers.Home.Name, templateUrl: 'ExpenseTracker/Views/Home.html' });

        }
    ])
    .constant('API_BASE_PATH', 'http://dev.expensetracker.com/api').constant('another', {});

angular.element(document).ready(() => {
    var body = angular.element('html');
    angular.bootstrap(body, ['ExpenseTracker']);
    var injector = body.injector();
    var profileService = injector.get(ExpenseTracker.Services.Profile.Name);
    profileService.get().then((profile: ExpenseTracker.Models.IProfile) => {
        /* API responded with a profile. This means the session is still valid. */
        profileService.cacheService.profile = profile;
        profileService.cacheService.initializeDefer.resolve(null);
    }, () => profileService.cacheService.initializeDefer.resolve(null));
});