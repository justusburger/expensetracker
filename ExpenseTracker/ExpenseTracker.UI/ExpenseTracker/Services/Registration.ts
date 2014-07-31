module ExpenseTracker.Services {

    interface IRegistrationResourceClass extends ng.resource.IResourceClass<ng.resource.IResource<Models.IRegistrationRequest>> {
        verify: (params: { verificationToken: string }, onSuccess: (response: Models.IProfile) => void, onError: Function) => void;
    }

    export class Registration extends ApiResource {

        public static Name: string = 'Registration';

        private registerResource: IRegistrationResourceClass;

        constructor() {
            super();
            this.registerResource = <IRegistrationResourceClass>this.resourceService(this.apiBaseUrl + '/registration/', null, {
                verify: { method: 'GET', url: this.apiBaseUrl + '/registration/verify/:verificationToken' },
            });
        }

        public create(form: Models.IRegistrationRequest): ng.IPromise<void> {
            var defer = this.promiseService.defer<void>();
            this.registerResource.save(
                form,
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public verify(verificationToken: string): ng.IPromise<Models.IProfile> {
            var defer = this.promiseService.defer<Models.IProfile>();
            this.registerResource.verify(
                { verificationToken: verificationToken },
                (response: Models.IProfile) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer, [ExpenseTracker.Errors.EMAIL_VERIFICATION_TOKEN_NOT_FOUND])
            );
            return defer.promise;
        }

    }

    angular.module('ExpenseTracker.Services').factory(Registration.Name, () => new Registration());

}  