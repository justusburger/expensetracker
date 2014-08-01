module ExpenseTracker.Services {

    interface ISignInResourceClass extends ng.resource.IResourceClass<ng.resource.IResource<Models.IProfile>> {
        resetPassword: (resetPasswordRequest: Models.IResetPasswordRequest, onSuccess: (response: any) => void, onError: (response: Models.IErrorResponse) => void) => void;
        validateResetPasswordLink: (args: { resetToken: string }, onSuccess: (response: Models.IProfile) => void, onError: (response: Models.IErrorResponse) => void) => void;
    }

    export class SignIn extends ApiResource {

        public static Name: string = 'SignIn';

        private signInResource: ISignInResourceClass;

        constructor() {
            super();
            this.signInResource = <ISignInResourceClass>this.resourceService(this.apiBaseUrl + '/sign-in', null, {
                resetPassword: { method: 'PUT', url: this.apiBaseUrl + '/sign-in/reset-password' },
                validateResetPasswordLink: { method: 'GET', url: this.apiBaseUrl + '/sign-in/reset-password/:resetToken' }
            });
        }

        public signIn(signInRequest: Models.ISignInRequest): ng.IPromise<Models.IProfile> {
            var defer = this.promiseService.defer<Models.IProfile>();
            this.signInResource.save(signInRequest,
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer, [ExpenseTracker.Errors.SIGN_IN_INCORRECT_DETAILS, ExpenseTracker.Errors.SIGN_IN_ACCOUNT_LOCKED, ExpenseTracker.Errors.SIGN_IN_EMAIL_NOT_VERIFIED])
            );
            return defer.promise;
        }

        public signOut(): ng.IPromise<void> {
            var defer = this.promiseService.defer<void>();
            this.signInResource.delete(
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public resetPassword(resetPasswordRequest: Models.IResetPasswordRequest): ng.IPromise<void> {
            var defer = this.promiseService.defer<void>();
            this.signInResource.resetPassword(resetPasswordRequest,
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public validateResetPasswordLink(resetToken: string): ng.IPromise<Models.IProfile> {
            var defer = this.promiseService.defer<Models.IProfile>();
            this.signInResource.validateResetPasswordLink({ resetToken: resetToken },
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer, [ExpenseTracker.Errors.RESET_PASSWORD_INVALID_TOKEN])
            );
            return defer.promise;
        }

    }

    angular.module('ExpenseTracker.Services').factory(SignIn.Name, () => new SignIn());

} 