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
                .when('/reset-password/:resetToken?', { controller: ExpenseTracker.Controllers.ResetPassword.Name, templateUrl: 'ExpenseTracker/Views/ResetPassword.html' })
                .when('/expenses/add', { controller: ExpenseTracker.Controllers.ExpenseDetails.Name, templateUrl: 'ExpenseTracker/Views/ExpenseDetails.html' })
                .when('/expenses/edit/:id', { controller: ExpenseTracker.Controllers.ExpenseDetails.Name, templateUrl: 'ExpenseTracker/Views/ExpenseDetails.html' })
                .when('/expenses/:welcome?', { controller: ExpenseTracker.Controllers.ExpenseList.Name, templateUrl: 'ExpenseTracker/Views/ExpenseList.html' })
                .when('/profile/:welcome?', { controller: ExpenseTracker.Controllers.Profile.Name, templateUrl: 'ExpenseTracker/Views/Profile.html' })
                .otherwise({ controller: ExpenseTracker.Controllers.Home.Name, templateUrl: 'ExpenseTracker/Views/Home.html' });

        }
    ])
    .constant('RECAPTCHA_PUBLIC_KEY', '6Lcc0fcSAAAAAK0jnYTPHjO7OrKZFEPFGV36Coqn')
    .constant('API_BASE_PATH', '/api')
    .constant('API_BASE_PATH_TEST', 'http://dev.expensetracker.com/api');

angular.element(document).ready(() => {
    var body = angular.element('html');
    angular.bootstrap(body, ['ExpenseTracker']);

    var injectorService: ng.auto.IInjectorService = body.injector();
    var cacheService: ExpenseTracker.Services.Cache = injectorService.get(ExpenseTracker.Services.Cache.Name);

    if (cacheService.sessionToken) {
        var userApiResourceService: ExpenseTracker.Services.ApiResource.UserApiResourceService = injectorService.get(ExpenseTracker.Services.ApiResource.UserApiResourceService.Name);
        userApiResourceService.get().then((user: ExpenseTracker.Models.IUser) => {
            cacheService.profile = user;
            cacheService.initializedDefer.resolve();
        }, () => {
            cacheService.sessionToken = '';
            cacheService.initializedDefer.resolve();
        });
    } else
        cacheService.initializedDefer.resolve();

});