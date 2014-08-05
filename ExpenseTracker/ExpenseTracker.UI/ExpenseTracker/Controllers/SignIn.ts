module ExpenseTracker.Controllers {

    export class SignIn extends ControllerBase {

        public static Name: string = 'SignIn';
        public form: ExpenseTracker.Models.IUser;

        constructor(scope: ng.IScope) {
            super(scope);
            this.form = {};
        }

        public signIn(): void {
            this.beginUpdate();
            this.userApiResourceService.signIn(this.form).then(
                (sessionToken: string) => {
                    this.cacheService.sessionToken = sessionToken;
                    this.userApiResourceService.get().then((user: Models.IUser) => {
                        this.endUpdate();
                        this.cacheService.profile = user;
                        this.locationService.path('/expenses');
                    }, (response: Models.IErrorResponse) => this.endUpdate());
                },
                (response: Models.IErrorResponse) => {
                    this.endUpdate();
                    if (response.data.type === ExpenseTracker.Errors.IncorrectUsernamePasswordCombinationException)
                        this.alertService.error("Incorrect sign in details. Please try again.");
                    if (response.data.type === ExpenseTracker.Errors.UserAccountLockedException)
                        this.alertService.error("Your account is locked. Please contact support.");
                    if (response.data.type === ExpenseTracker.Errors.EmailAddressNotVerifiedException)
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