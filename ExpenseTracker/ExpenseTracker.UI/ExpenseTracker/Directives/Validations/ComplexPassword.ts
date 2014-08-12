module ExpenseTracker.Directives.Validations {

    export class ComplexPassword extends ValidationBase {

        public static Name: string = 'complexPassword';
        public static ErrorMessage: string = 'Password must be 6 or more characters and contain atleast 1 number.';

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
            //Ensure password length is > 6
            if (viewValue.length < 6)
                valid = false;

            //Ensure password contains atleast 1 number
            if (!/[\d]+/.test(viewValue))
                valid = false;

            this.modelController.$setValidity(ComplexPassword.Name, valid);
            return viewValue;
        }

    }

    angular.module('ExpenseTracker.Directives').directive(ComplexPassword.Name, (): ng.IDirective => <ng.IDirective>{
        restrict: 'A',
        require: 'ngModel',
        scope: true,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) => new ComplexPassword(scope.$new(), element, attributes, modelController)
    });
    Validate.ErrorMessages[ComplexPassword.Name] = ComplexPassword.ErrorMessage;

} 