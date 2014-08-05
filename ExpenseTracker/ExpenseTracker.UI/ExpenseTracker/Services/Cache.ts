module ExpenseTracker.Services {
    
    export class Cache {
        
        public static Name: string = "Cache";
        public static SessionTokenCookieName: string = "session";
        private _data: any = {};
        private httpService: ng.IHttpService;
        private cookiesService: ng.cookies.ICookiesService;
        public initializedDefer: ng.IDeferred<void>;

        constructor(cookiesService: ng.cookies.ICookiesService, httpService: ng.IHttpService, promiseService: ng.IQService) {
            this.httpService = httpService;
            this.cookiesService = cookiesService;

            this.initializedDefer = promiseService.defer<void>();
        }

        public _profile: Models.IUser;
        public get profile(): Models.IUser {
            return this._profile;
        }
        public set profile(value: Models.IUser) {
            this._profile = value;
        }

        public _sessionToken: string;
        public get sessionToken(): string {
            if (!angular.isDefined(this._sessionToken)) {
                this._sessionToken = this.cookiesService[Cache.SessionTokenCookieName];
                this.httpService.defaults.headers.common["X-Auth"] = this._sessionToken;
            }
            return this._sessionToken;
        }
        public set sessionToken(value: string) {
            this._sessionToken = value;
            this.httpService.defaults.headers.common["X-Auth"] = value;
            this.cookiesService[Cache.SessionTokenCookieName] = value;
        }

    }

    angular.module('ExpenseTracker.Services').factory(Cache.Name, [
        '$cookies',
        '$http',
        '$q',
        (cookiesService: ng.cookies.ICookiesService, httpService: ng.IHttpService, promiseService: ng.IQService) =>
            new Cache(cookiesService, httpService, promiseService)
    ]);

} 