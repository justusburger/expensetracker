module ExpenseTracker.Controllers {

    export class ResetPassword extends ControllerBase {

        public static Name: string = 'ResetPassword';
        public form: Models.IResetPasswordRequest;
        public requestSent: boolean = false;
        public resetFailed: boolean = false;

        constructor(scope: ng.IScope) {
            super(scope);
            this.form = {};

            if (this.resetToken) {
                this.signInService.validateResetPasswordLink(this.resetToken).then((profile: Models.IProfile) => {
                    this.cacheService.profile = profile;
                    this.locationService.path('/profile/reset-password');
                }, (response: Models.IErrorResponse) => {
                    this.resetFailed = true;
                });
            }
        }

        public reset(): void {
            this.beginUpdate();
            this.signInService.resetPassword(this.form).then(() => {
                this.endUpdate();
                this.requestSent = true;
            }, (response: Models.IErrorResponse) => {
                this.endUpdate();
            });
        }

        public get resetToken(): string {
            return this.routeParamsService['resetToken'];
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(ResetPassword.Name, [
        '$scope',
        (scope: ng.IScope) => new ResetPassword(scope)
    ]);
}    