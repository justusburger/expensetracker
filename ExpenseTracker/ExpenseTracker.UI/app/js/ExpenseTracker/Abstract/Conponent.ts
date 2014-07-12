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

        public get isAuthenticated(): boolean {
            return this.authenticationService.isAuthenticated;
        }

        constructor() {
            
        }

    }
} 