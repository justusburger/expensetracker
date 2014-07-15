﻿angular.module('ExpenseTracker.Services', []);
angular.module('ExpenseTracker.Controllers', []);
angular.module('ExpenseTracker.Directives', []);
angular.module('ExpenseTracker', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ExpenseTracker.Services', 'ExpenseTracker.Controllers', 'ExpenseTracker.Directives']).config([
    '$routeProvider',
    function (routeProvider) {
        routeProvider.when('/registration', { controller: ExpenseTracker.Controllers.Registration.Name, templateUrl: 'ExpenseTracker/Views/Registration.html' }).otherwise({ controller: ExpenseTracker.Controllers.Home.Name, templateUrl: 'ExpenseTracker/Views/Home.html' });
    }
]).constant('API_BASE_PATH', 'http://dev.expensetracker.com/api').constant('another', {});

angular.element(document).ready(function () {
    var body = angular.element('html');
    angular.bootstrap(body, ['ExpenseTracker']);
    var injector = body.injector();
    var profileService = injector.get(ExpenseTracker.Services.Profile.Name);
    profileService.get().then(function (profile) {
        /* API responded with a profile. This means the session is still valid. */
        profileService.cacheService.profile = profile;
        profileService.cacheService.initializeDefer.resolve(null);
    }, function () {
        return profileService.cacheService.initializeDefer.resolve(null);
    });
});
//# sourceMappingURL=Configuration.js.map
