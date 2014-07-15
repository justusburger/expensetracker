module ExpenseTracker.Services {
    
    export class Cache {
        
        public static Name: string = "Cache";
        private _data: any = {};
        public initializeDefer: ng.IDeferred<void>;

        constructor(promiseService: ng.IQService) {
            this.initializeDefer = promiseService.defer<void>();
        }

        public _profile: Models.IProfile;
        public get profile(): Models.IProfile {
            return this._profile;
        }
        public set profile(value: Models.IProfile) {
            this._profile = value;
        }

        

    }

    angular.module('ExpenseTracker.Services').factory(Cache.Name, ['$q', (promiseService: ng.IQService) => new Cache(promiseService)]);

} 