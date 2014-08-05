module ExpenseTracker.Directives {

    export class Menu extends DirectiveBase {

        public static Name: string = 'menu';
        public static TemplateUrl: string = 'ExpenseTracker/Views/Menu.html';
        public checkingSession: boolean = true;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super(scope, element, attributes);
        }

        public initialize(): ng.IPromise<void> {
            return super.initialize().then(() => {
                this.checkingSession = false;
                return this.promiseService.when(<any>true);
            });
        }

        public signOut(): void {
            this.beginUpdate();
            this.userApiResourceService.signOut().then(() => this.signOutSuccess(), () => this.signOutSuccess());
        }

        public signOutSuccess(): void {
            this.endUpdate();
            this.cacheService.sessionToken = '';
            this.cacheService.profile = null;
            this.locationService.path("/");
        }

    }

    angular.module('ExpenseTracker.Directives').directive(Menu.Name, (): ng.IDirective => <ng.IDirective>{
        replace: true,
        restrict: 'E',
        scope: true,
        templateUrl: Menu.TemplateUrl,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) => new Menu(scope, element, attributes)
    });

} 
