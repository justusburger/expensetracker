angular.module('ExpenseTracker.Services', []);
angular.module('ExpenseTracker.Filters', []);
angular.module('ExpenseTracker.Controllers', []);
angular.module('ExpenseTracker.Directives', []);
angular.module('ExpenseTracker', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap', 'ngTagsInput', 'ExpenseTracker.Services', 'ExpenseTracker.Controllers', 'ExpenseTracker.Directives', 'ExpenseTracker.Filters'])
    .config([
        '$routeProvider',
        (routeProvider: ng.route.IRouteProvider) => {
            routeProvider
                .when('/registration', { controller: ExpenseTracker.Controllers.Registration.Name, templateUrl: 'ExpenseTracker/Views/Registration.html' })
                .when('/registration-complete', { controller: ExpenseTracker.Controllers.RegistrationComplete.Name, templateUrl: 'ExpenseTracker/Views/RegistrationComplete.html' })
                .when('/verify/:verificationToken', { controller: ExpenseTracker.Controllers.EmailVerification.Name, templateUrl: 'ExpenseTracker/Views/EmailVerification.html' })
                .when('/sign-in/:expired?', { controller: ExpenseTracker.Controllers.SignIn.Name, templateUrl: 'ExpenseTracker/Views/SignIn.html' })
                .when('/expenses/add', { controller: ExpenseTracker.Controllers.ExpenseDetails.Name, templateUrl: 'ExpenseTracker/Views/ExpenseDetails.html' })
                .when('/expenses/edit/:id', { controller: ExpenseTracker.Controllers.ExpenseDetails.Name, templateUrl: 'ExpenseTracker/Views/ExpenseDetails.html' })
                .when('/expenses/:welcome?', { controller: ExpenseTracker.Controllers.ExpenseList.Name, templateUrl: 'ExpenseTracker/Views/ExpenseList.html' })
                .when('/profile/:welcome?', { controller: ExpenseTracker.Controllers.Profile.Name, templateUrl: 'ExpenseTracker/Views/Profile.html' })
                .otherwise({ controller: ExpenseTracker.Controllers.Home.Name, templateUrl: 'ExpenseTracker/Views/Home.html' });

        }
    ])
    .constant('API_BASE_PATH', '/api')
    .constant('API_BASE_PATH_TEST', 'http://dev.expensetracker.com/api');

angular.element(document).ready(() => {
    var body = angular.element('html');
    angular.bootstrap(body, ['ExpenseTracker']);

    var injector: ng.auto.IInjectorService = body.injector();
    var cacheService: ExpenseTracker.Services.Cache = injector.get(ExpenseTracker.Services.Cache.Name);
    var cookies = injector.get('$cookies');
    /* Check if user has visited before and still has a session cookie. 
       This session cookie might still be valid so call the profile service to make sure. */
    if (angular.isDefined(cookies['session'])) {
        var profileService: ExpenseTracker.Services.Profile = injector.get(ExpenseTracker.Services.Profile.Name);
        profileService.get().then((profile: ExpenseTracker.Models.IProfile) => {
            /* API responded with a profile. This means the session is still valid. */
            cacheService.profile = profile;
            cacheService.initializeDefer.resolve();
        }, () => cacheService.initializeDefer.resolve());
    } else {
        /* The user does not have a session cookie, so simply mark application as loaded */
        cacheService.initializeDefer.resolve();
    }
});