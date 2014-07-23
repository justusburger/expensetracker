module ExpenseTracker.Services {

    interface IProfileResourceClass extends ng.resource.IResourceClass<ng.resource.IResource<Models.IFullProfile>> {
        getFullProfile: (onSuccess: (profile: Models.IFullProfile) => void, onError: Function) => void;
        update: (model: Models.IFullProfile,  onSuccess: (profile: Models.IFullProfile) => void, onError: Function) => void;
    }

    export class Profile extends ApiResource {

        public static Name: string = 'Profile';

        private profileResource: IProfileResourceClass;

        constructor() {
            super();
            this.profileResource = <IProfileResourceClass>this.resourceService(this.apiBaseUrl + '/profile', null, {
                getFullProfile: { method: 'GET', url: this.apiBaseUrl + '/profile/full' },
                update: { method: 'PUT' }
            });
        }

        public get(): ng.IPromise<Models.IProfile> {
            var defer = this.promiseService.defer<Models.IProfile>();
            this.profileResource.get(
                (response: Models.ISuccessResponse) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer, [ExpenseTracker.Errors.UNAUTHENTICATED])
            );
            return defer.promise;
        }

        public getFullProfile(): ng.IPromise<Models.IFullProfile> {
            var defer = this.promiseService.defer<Models.IFullProfile>();
            this.profileResource.getFullProfile(
                (response: Models.IFullProfile) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
                );
            return defer.promise;
        }

        public update(profile: Models.IFullProfile): ng.IPromise<Models.IFullProfile> {
            var defer = this.promiseService.defer<Models.IFullProfile>();
            this.profileResource.update(profile,
                (response: Models.IFullProfile) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

    }

    angular.module('ExpenseTracker.Services').factory(Profile.Name, () => new Profile());

}  