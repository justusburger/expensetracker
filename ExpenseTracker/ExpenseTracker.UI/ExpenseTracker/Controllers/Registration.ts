module ExpenseTracker.Controllers {

    export class Registration extends ControllerBase {

        public static Name: string = 'Registration';
        public form: ExpenseTracker.Models.IRegistrationRequest = <ExpenseTracker.Models.IRegistrationRequest>{};

        constructor(scope: ng.IScope) {
            super(scope);
        }

        public register(): void {
            this.registrationService.create(this.form).then((profile: Models.IProfile) => {
                this.cacheService.profile = profile;
                this.locationService.path('/profile/welcome');
            });
        }
    }

    angular.module('ExpenseTracker.Controllers').controller(Registration.Name, [
        '$scope',
        (scope: ng.IScope) => new Registration(scope)
    ]);
}  