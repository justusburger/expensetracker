module ExpenseTracker {

    export interface IDirectiveScope extends ng.IScope {
        $directive: DirectiveBase;
    }

    export class DirectiveBase extends SecuredComponent {

        public scope: IDirectiveScope;
        public element: JQuery;
        public attributes: ng.IAttributes;

        private _templateCacheService: ng.ITemplateCacheService;
        public get templateCacheService(): ng.ITemplateCacheService {
            return this._templateCacheService || (this._templateCacheService = this.injectorService.get('$templateCache'));
        }
        public set templateCacheService(value: ng.ITemplateCacheService) {
            this._templateCacheService = value;
        }

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super();
            this.scope = <IDirectiveScope>scope;
            this.element = element;
            this.attributes = attributes;

            this.scope.$directive = this;
        }

    }

} 