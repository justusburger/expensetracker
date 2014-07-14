module ExpenseTracker {
    export class Component {

        private _injectorService: ng.auto.IInjectorService;
        public get injectorService(): ng.auto.IInjectorService {
            return this._injectorService || (this._injectorService = (<ng.auto.IInjectorService>(<any>$('html')).injector()));
        }
        public set injectorService(value: ng.auto.IInjectorService) {
            this._injectorService = value;
        }

        private _authenticationService: ExpenseTracker.Services.Authentication;
        public get authenticationService(): ExpenseTracker.Services.Authentication {
            return this._authenticationService || (this._authenticationService = this.injectorService.get(ExpenseTracker.Services.Authentication.Name));
        }
        public set authenticationService(value: ExpenseTracker.Services.Authentication) {
            this._authenticationService = value;
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

        public get isAuthenticated(): boolean {
            return this.authenticationService.isAuthenticated;
        }

        constructor() {
            
        }

    }
} 