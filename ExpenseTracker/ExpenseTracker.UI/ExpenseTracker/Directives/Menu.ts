module ExpenseTracker.Directives {

    export class Menu extends DirectiveBase {

        public static Name: string = 'menu';
        public static TemplateUrl: string = 'ExpenseTracker/Views/Menu.html';

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super(scope, element, attributes);
        }
        
        public signOut(): void {
            
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
