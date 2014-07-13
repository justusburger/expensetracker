module ExpenseTracker.Directives.Validations {

    export class Match extends ValidationBase {

        public static Name: string = 'match';
        public static ErrorMessage: string = 'Passwords do not match';

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) {
            super(scope, element, attributes, modelController);
        }

        public format(modelValue: any): any {
            return modelValue;
        }

        public parse(viewValue: any): any {
            if (typeof viewValue === 'undefined' || viewValue === null || viewValue === '')
                return viewValue;

            var valid = true;
            if (viewValue !== this.valueToMatch)
                valid = false;

            this.modelController.$setValidity(Match.Name, valid);
            return viewValue;
        }

        public get valueToMatch(): any {
            return this.scope.$eval(this.attributes[Match.Name]);
        }

    }

    angular.module('ExpenseTracker.Directives').directive(Match.Name, (): ng.IDirective => <ng.IDirective>{
        restrict: 'A',
        require: 'ngModel',
        scope: true,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) => new Match(scope.$new(), element, attributes, modelController)
    });
    Validate.ErrorMessages[Match.Name] = Match.ErrorMessage;

}  