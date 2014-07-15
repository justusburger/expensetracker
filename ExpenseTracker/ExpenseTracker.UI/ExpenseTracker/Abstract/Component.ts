module ExpenseTracker {
    export class Component {

        private _injectorService: ng.auto.IInjectorService;
        public get injectorService(): ng.auto.IInjectorService {
            return this._injectorService || (this._injectorService = (<ng.auto.IInjectorService>(<any>$('html')).injector()));
        }
        public set injectorService(value: ng.auto.IInjectorService) {
            this._injectorService = value;
        }

        private _signInService: ExpenseTracker.Services.SignIn;
        public get signInService(): ExpenseTracker.Services.SignIn {
            return this._signInService || (this._signInService = this.injectorService.get(ExpenseTracker.Services.SignIn.Name));
        }
        public set signInService(value: ExpenseTracker.Services.SignIn) {
            this._signInService = value;
        }

        private _profileService: ExpenseTracker.Services.Profile;
        public get profileService(): ExpenseTracker.Services.Profile {
            return this._profileService || (this._profileService = this.injectorService.get(ExpenseTracker.Services.Profile.Name));
        }
        public set profileService(value: ExpenseTracker.Services.Profile) {
            this._profileService = value;
        }

        private _registrationService: ExpenseTracker.Services.Registration;
        public get registrationService(): ExpenseTracker.Services.Registration {
            return this._registrationService || (this._registrationService = this.injectorService.get(ExpenseTracker.Services.Registration.Name));
        }
        public set registrationService(value: ExpenseTracker.Services.Registration) {
            this._registrationService = value;
        }

        private _promiseService: ng.IQService;
        public get promiseService(): ng.IQService {
            return this._promiseService || (this._promiseService = this.injectorService.get('$q'));
        }
        public set promiseService(value: ng.IQService) {
            this._promiseService = value;
        }

        private _httpService: ng.IHttpService;
        public get httpService(): ng.IHttpService {
            return this._httpService || (this._httpService = this.injectorService.get('$http'));
        }
        public set httpService(value: ng.IHttpService) {
            this._httpService = value;
        }

        private _resourceService: ng.resource.IResourceService;
        public get resourceService(): ng.resource.IResourceService {
            return this._resourceService || (this._resourceService = this.injectorService.get('$resource'));
        }
        public set resourceService(value: ng.resource.IResourceService) {
            this._resourceService = value;
        }

        private _timeoutService: ng.ITimeoutService;
        public get timeoutService(): ng.ITimeoutService {
            return this._timeoutService || (this._timeoutService = this.injectorService.get('$timeout'));
        }
        public set timeoutService(value: ng.ITimeoutService) {
            this._timeoutService = value;
        }

        private _alertService: ExpenseTracker.Services.Alert;
        public get alertService(): ExpenseTracker.Services.Alert {
            return this._alertService || (this._alertService = this.injectorService.get(ExpenseTracker.Services.Alert.Name));
        }
        public set alertService(value: ExpenseTracker.Services.Alert) {
            this._alertService = value;
        }

        private _cacheService: ExpenseTracker.Services.Cache;
        public get cacheService(): ExpenseTracker.Services.Cache {
            return this._cacheService || (this._cacheService = this.injectorService.get(ExpenseTracker.Services.Cache.Name));
        }
        public set cacheService(value: ExpenseTracker.Services.Cache) {
            this._cacheService = value;
        }

        public get isSignedIn(): boolean {
            return !!this.cacheService.profile;
        }
        public get profile(): Models.IProfile {
            return this.cacheService.profile;
        }

        constructor() {
            this.cacheService.initializeDefer.promise.finally(() => this.onInitialized());
        }

        public onInitialized(): void {
            
        }

    }
} 