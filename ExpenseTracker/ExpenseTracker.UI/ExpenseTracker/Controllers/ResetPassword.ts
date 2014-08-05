module ExpenseTracker.Controllers {

    export class ResetPassword extends ControllerBase {

        public static Name: string = 'ResetPassword';
        public form: Models.IResetPasswordRequest;
        public requestSent: boolean = false;
        public resetFailed: boolean = false;

        constructor(scope: ng.IScope) {
            super(scope);
            this.form = {};
        }

        public initialize(): ng.IPromise<void> {
            return super.initialize().then(() => {
                if (this.resetToken) {
                    return this.userApiResourceService.verifyResetPassword(this.resetToken).then((sessionToken: string) => {
                        this.cacheService.sessionToken = sessionToken;
                        this.userApiResourceService.get().then((user: Models.IUser) => {
                            this.cacheService.profile = user;
                            this.locationService.path('/profile/reset-password');
                        });
                    }, (response: Models.IErrorResponse) => {
                        this.resetFailed = true;
                    });
                }
                return this.promiseService.when(<any>true);
            });
        }

        public reset(): void {
            this.beginUpdate();
            this.userApiResourceService.resetPassword(this.form).then(() => {
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