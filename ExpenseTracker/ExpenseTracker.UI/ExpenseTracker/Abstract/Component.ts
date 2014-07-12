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

        public get isAuthenticated(): boolean {
            return this.authenticationService.isAuthenticated;
        }

        constructor() {
            
        }

    }
} 