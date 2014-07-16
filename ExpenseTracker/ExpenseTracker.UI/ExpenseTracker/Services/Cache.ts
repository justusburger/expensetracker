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

        private _expenseTypeNameDictionary: any;
        public get expenseTypeNameDictionary(): any {
            return this._expenseTypeNameDictionary || (this._expenseTypeNameDictionary = {});
        }
        public set expenseTypeNameDictionary(value: any) {
            this._expenseTypeNameDictionary = value;
        }

    }

    angular.module('ExpenseTracker.Services').factory(Cache.Name, ['$q', (promiseService: ng.IQService) => new Cache(promiseService)]);

} 