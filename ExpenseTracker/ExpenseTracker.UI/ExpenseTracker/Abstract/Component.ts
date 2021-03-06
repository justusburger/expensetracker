﻿module ExpenseTracker {
    export class Component {

        public get apiBaseUrl(): string {
            return this.injectorService.get('API_BASE_PATH');
        }

        private _injectorService: ng.auto.IInjectorService;
        public get injectorService(): ng.auto.IInjectorService {
            if (!this._injectorService) 
                this._injectorService = angular.element('html').injector();
            return this._injectorService;
        }
        public set injectorService(value: ng.auto.IInjectorService) {
            this._injectorService = value;
        }

        private _expenseApiResourceService: ExpenseTracker.Services.ApiResource.ExpenseApiResourceService;
        public get expenseApiResourceService(): ExpenseTracker.Services.ApiResource.ExpenseApiResourceService {
            return this._expenseApiResourceService || (this._expenseApiResourceService = this.injectorService.get(ExpenseTracker.Services.ApiResource.ExpenseApiResourceService.Name));
        }
        public set expenseApiResourceService(value: ExpenseTracker.Services.ApiResource.ExpenseApiResourceService) {
            this._expenseApiResourceService = value;
        }

        private _userApiResourceService: ExpenseTracker.Services.ApiResource.UserApiResourceService;
        public get userApiResourceService(): ExpenseTracker.Services.ApiResource.UserApiResourceService {
            return this._userApiResourceService || (this._expenseApiResourceService = this.injectorService.get(ExpenseTracker.Services.ApiResource.UserApiResourceService.Name));
        }
        public set userApiResourceService(value: ExpenseTracker.Services.ApiResource.UserApiResourceService) {
            this._userApiResourceService = value;
        }

        private _popupService: ExpenseTracker.Services.Popup;
        public get popupService(): ExpenseTracker.Services.Popup {
            return this._popupService || (this._popupService = this.injectorService.get(ExpenseTracker.Services.Popup.Name));
        }
        public set popupService(value: ExpenseTracker.Services.Popup) {
            this._popupService = value;
        }

        private _downloadHelperService: ExpenseTracker.Services.DownloadHelper;
        public get downloadHelperService(): ExpenseTracker.Services.DownloadHelper {
            return this._downloadHelperService || (this._downloadHelperService = this.injectorService.get(ExpenseTracker.Services.DownloadHelper.Name));
        }
        public set downloadHelperService(value: ExpenseTracker.Services.DownloadHelper) {
            this._downloadHelperService = value;
        }

        private _promiseService: ng.IQService;
        public get promiseService(): ng.IQService {
            return this._promiseService || (this._promiseService = this.injectorService.get('$q'));
        }
        public set promiseService(value: ng.IQService) {
            this._promiseService = value;
        }

        private _compileService: ng.ICompileService;
        public get compileService(): ng.ICompileService {
            return this._compileService || (this._compileService = this.injectorService.get('$compile'));
        }
        public set compileService(value: ng.ICompileService) {
            this._compileService = value;
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

        private _locationService: ng.ILocationService;
        public get locationService(): ng.ILocationService {
            return this._locationService || (this._locationService = this.injectorService.get('$location'));
        }
        public set locationService(value: ng.ILocationService) {
            this._locationService = value;
        }

        private _sceService: ng.ISCEService;
        public get sceService(): ng.ISCEService {
            return this._sceService || (this._sceService = this.injectorService.get('$sce'));
        }
        public set sceService(value: ng.ISCEService) {
            this._sceService = value;
        }

        private _interpolateService: ng.IInterpolateService;
        public get interpolateService(): ng.IInterpolateService {
            return this._interpolateService || (this._interpolateService = this.injectorService.get('$interpolate'));
        }
        public set interpolateService(value: ng.IInterpolateService) {
            this._interpolateService = value;
        }

        private _routeParamsService: ng.route.IRouteParamsService;
        public get routeParamsService(): ng.route.IRouteParamsService {
            return this._routeParamsService || (this._routeParamsService = this.injectorService.get('$routeParams'));
        }
        public set routeParamsService(value: ng.route.IRouteParamsService) {
            this._routeParamsService = value;
        }

        private _filterService: ng.IFilterService;
        public get filterService(): ng.IFilterService {
            return this._filterService || (this._filterService = this.injectorService.get('$filter'));
        }
        public set filterService(value: ng.IFilterService) {
            this._filterService = value;
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
        
        private _dataProviderFactory: ExpenseTracker.Services.DataProviderFactory;
        public get dataProviderFactory(): ExpenseTracker.Services.DataProviderFactory {
            return this._dataProviderFactory || (this._dataProviderFactory = this.injectorService.get(ExpenseTracker.Services.DataProviderFactory.Name));
        }
        public set dataProviderFactory(value: ExpenseTracker.Services.DataProviderFactory) {
            this._dataProviderFactory = value;
        }

        public get isSignedIn(): boolean {
            return !!this.cacheService.profile;
        }
        public get profile(): Models.IUser {
            return this.cacheService.profile;
        }

        private _loadingStack: any[] = [];
        public isLoading(type?: string): boolean {
            return this._loadingStack.any(item => item === (type || true));
        }
        public beginUpdate(type?: string): void {
            this._loadingStack.push(type || true);
        }
        public endUpdate(type?: string): void {
            var itemToRemove: any;
            this._loadingStack.forEach(item => {
                if (item === (type || true) && !itemToRemove)
                    itemToRemove = item;
            });
            this._loadingStack.remove(itemToRemove);
        }

        public get isSecured(): boolean {
            return false;
        }

        constructor() {
            this.cacheService.initializedDefer.promise.then(() => this .initialize());
        }

        public initialize(): ng.IPromise<void> {
            return this.promiseService.when(<any>true);
        }

    }
} 