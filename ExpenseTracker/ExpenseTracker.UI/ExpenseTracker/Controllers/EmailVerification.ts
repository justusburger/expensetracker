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
                this.userApiResourceService.verifyEmail(token).then(
                    (sessionToken: string) => {
                        this.endUpdate();
                        this.cacheService.sessionToken = sessionToken;
                        this.beginUpdate();
                        this.userApiResourceService.get().then((user: Models.IUser) => {
                            this.endUpdate();
                            this.cacheService.profile = user;
                            this.locationService.path('/profile/welcome');
                        }, () => this.endUpdate());
                    }, (response: Models.IErrorResponse) => {
                        this.endUpdate();
                        if (response.data.type === ExpenseTracker.Errors.EmailVerificationTokenInvalidException)
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