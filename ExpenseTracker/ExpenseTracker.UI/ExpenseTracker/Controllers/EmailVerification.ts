module ExpenseTracker.Controllers {

    export class EmailVerification extends ControllerBase {

        public static Name: string = 'EmailVerification';

        constructor(scope: ng.IScope) {
            super(scope);
        }

        public initialize(): ng.IPromise<void> {
            return super.initialize().then(() => {
                var token = this.routeParamsService["verificationToken"];
                if (!token)
                    this.locationService.path("/");

                this.beginUpdate();
                this.registrationService.verify(token).then(
                    (profile: Models.IProfile) => {
                        this.endUpdate();
                        this.cacheService.profile = profile;
                        this.locationService.path('/profile/welcome');
                    }, (response: Models.IErrorResponse) => {
                        this.endUpdate();
                        if (response.data.errorCode === ExpenseTracker.Errors.EMAIL_VERIFICATION_TOKEN_NOT_FOUND)
                            this.alertService.error('Invalid email verification link. Please contact support@expensetracker.co.za.');
                    }
                );
            });
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(EmailVerification.Name, [
        '$scope',
        (scope: ng.IScope) => new EmailVerification(scope)
    ]);
}    