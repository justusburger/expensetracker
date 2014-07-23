module ExpenseTracker.Services {

    export class Registration extends ApiResource {

        public static Name: string = 'Registration';

        public registerResource: ng.resource.IResourceClass<ng.resource.IResource<Models.IRegistrationRequest>>;

        constructor() {
            super();
            this.registerResource = this.resourceService(this.apiBaseUrl + '/registration/');
        }

        public create(form: Models.IRegistrationRequest): ng.IPromise<Models.IProfile> {
            var defer = this.promiseService.defer<Models.IProfile>();
            this.registerResource.save(
                form,
                (response: Models.IProfile) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

    }

    angular.module('ExpenseTracker.Services').factory(Registration.Name, () => new Registration());

}  