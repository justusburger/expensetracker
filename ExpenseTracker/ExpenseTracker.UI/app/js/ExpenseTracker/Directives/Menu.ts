﻿module ExpenseTracker.Directives {

    export class Menu extends DirectiveBase {

        public static Name: string = 'menu';

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super(scope, element, attributes);
        }

        public signIn(): void {
            this.authenticationService.authenticationToken = "asdcfv";
        }

    }

    angular.module('ExpenseTracker.Directives').directive(Menu.Name, (): ng.IDirective => <ng.IDirective>{
        replace: true,
        restrict: 'E',
        scope: true,
        templateUrl: 'js/ExpenseTracker/Views/Menu.html',           
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) => new Menu(scope, element, attributes)
    });

} 