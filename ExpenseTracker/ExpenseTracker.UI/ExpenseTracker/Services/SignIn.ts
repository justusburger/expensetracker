module ExpenseTracker.Services {

    export class SignIn extends ApiResource {

        public static Name: string = 'SignIn';

        public signInResource: ng.resource.IResourceClass<ng.resource.IResource<Models.ISignInRequest>>;

        public signIn(signInRequest: Models.ISignInRequest): ng.IPromise<void> {
            var defer = this.promiseService.defer<void>();
            this.signInResource.save(signInRequest,
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer, [ExpenseTracker.Errors.SIGN_IN_INCORRECT_DETAILS, ExpenseTracker.Errors.SIGN_IN_ACCOUNT_LOCKED])
            );
            return defer.promise;
        }

        public signOut(): ng.IPromise<void> {
            var defer = this.promiseService.defer<void>();
            this.signInResource.delete(
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer, [ExpenseTracker.Errors.SIGN_IN_INCORRECT_DETAILS, ExpenseTracker.Errors.SIGN_IN_ACCOUNT_LOCKED])
            );
            return defer.promise;
        }

        constructor() {
            super();
            this.signInResource = this.resourceService(this.apiBaseUrl + '/sign-in');
        }

    }

    angular.module('ExpenseTracker.Services').factory(SignIn.Name, () => new SignIn());

} 