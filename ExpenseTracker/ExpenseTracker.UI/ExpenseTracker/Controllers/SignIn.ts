module ExpenseTracker.Controllers {

    export class SignIn extends ControllerBase {

        public static Name: string = 'SignIn';
        public form: ExpenseTracker.Models.ISignInRequest = <ExpenseTracker.Models.ISignInRequest>{};

        constructor(scope: ng.IScope) {
            super(scope);
            this.form = {
                email: 'justusburger@gmail.com',
                password: 'P@ssw0rd',
                rememberMe: true
            };
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
                }
            );
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(SignIn.Name, [
        '$scope',
        (scope: ng.IScope) => new SignIn(scope)
    ]);
}   