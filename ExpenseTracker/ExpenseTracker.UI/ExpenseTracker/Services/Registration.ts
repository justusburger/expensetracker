module ExpenseTracker.Services {

    export class Registration extends ApiResourceService {

        public static Name: string = 'Registration';

        public registerResource: ng.resource.IResourceClass<any>;

        constructor() {
            super();
            this.registerResource = this.resourceService(this.apiBaseUrl + '/registration/');
        }

        public register(form: Models.IRegistrationForm): ng.IPromise<void> {
            var defer = this.promiseService.defer<void>();
            this.registerResource.save(
                form,
                (response: Models.ISuccessResponse) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

    }

    angular.module('ExpenseTracker.Services').factory(Registration.Name, () => new Registration());

}  