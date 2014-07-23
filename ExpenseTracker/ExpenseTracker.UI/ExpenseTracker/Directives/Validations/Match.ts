module ExpenseTracker.Directives.Validations {

    export class Match extends ValidationBase {

        public static Name: string = 'match';
        public static ErrorMessage: string = 'Passwords do not match';
        private formController: ng.IFormController;
        private matchingModelController: ng.INgModelController;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController, formController: ng.IFormController) {
            super(scope, element, attributes, modelController);
            this.formController = formController;

            this.matchingModelController = this.formController[attributes[Match.Name]];
            if (this.matchingModelController) {
                this.matchingModelController.$parsers.unshift((viewValue) => {
                    this.parse(this.modelController.$viewValue);
                    return viewValue;
                });
            }
        }

        public format(modelValue: any): any {
            return modelValue;
        }

        public parse(viewValue: any): any {
            var valid = true;
            if (viewValue !== this.matchingModelController.$viewValue)
                valid = false;

            this.modelController.$setValidity(Match.Name, valid);
            return viewValue;
        }
    }

    angular.module('ExpenseTracker.Directives').directive(Match.Name, () => {
        return {
            restrict: 'A',
            require: ['ngModel', '^form'],
            scope: true,
            link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, controllers: any[]) => new Match(scope.$new(), element, attributes, controllers[0], controllers[1])
        };
    });
    Validate.ErrorMessages[Match.Name] = Match.ErrorMessage;

}  