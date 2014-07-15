module ExpenseTracker.Services {

    export class Profile extends ApiResource {

        public static Name: string = 'Profile';

        public profileResource: ng.resource.IResourceClass<ng.resource.IResource<Models.IProfile>>;

        public get(): ng.IPromise<Models.IProfile> {
            var defer = this.promiseService.defer<Models.IProfile>();
            this.profileResource.get(
                (response: Models.ISuccessResponse) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer, [ExpenseTracker.Errors.UNAUTHENTICATED])
            );
            return defer.promise;
        }

        constructor() {
            super();
            this.profileResource = this.resourceService(this.apiBaseUrl + '/profile');
        }

    }

    angular.module('ExpenseTracker.Services').factory(Profile.Name, () => new Profile());

}  