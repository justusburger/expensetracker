module ExpenseTracker.Controllers {

    export class SignIn extends ControllerBase {

        public static Name: string = 'SignIn';
        public form: ExpenseTracker.Models.ISignInRequest = <ExpenseTracker.Models.ISignInRequest>{};

        constructor(scope: ng.IScope) {
            super(scope);
        }

        public signIn(): void {
            this.beginUpdate();
            this.signInService.signIn(this.form).then(
                (profile: Models.IProfile) => {
                    this.endUpdate();
                    this.cacheService.profile = profile;
                    this.locationService.path('/expenses');
                },
                (response: Models.IErrorResponse) => {
                    this.endUpdate();
                    if (response.data.errorCode === ExpenseTracker.Errors.SIGN_IN_INCORRECT_DETAILS)
                        this.alertService.error("Incorrect sign in details. Please try again.");
                    if (response.data.errorCode === ExpenseTracker.Errors.SIGN_IN_ACCOUNT_LOCKED)
                        this.alertService.error("Your account is locked. Please contact support.");
                    if (response.data.errorCode === ExpenseTracker.Errors.SIGN_IN_EMAIL_NOT_VERIFIED)
                        this.alertService.error("Your email address has not been verified. Please check your email and click the verification link. If you did not recieve an email, please contact support@expensetracker.co.za.");
                }
            );
        }

        public get sessionExpired(): boolean {
            return this.routeParamsService['expired'] === 'expired';
        }
    }

    angular.module('ExpenseTracker.Controllers').controller(SignIn.Name, [
        '$scope',
        (scope: ng.IScope) => new SignIn(scope)
    ]);
}   