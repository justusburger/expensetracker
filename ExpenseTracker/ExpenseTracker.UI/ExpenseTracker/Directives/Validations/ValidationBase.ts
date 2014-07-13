module ExpenseTracker.Directives.Validations {

    export class ValidationBase extends DirectiveBase {

        public modelController: ng.INgModelController;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) {
            super(scope, element, attributes);
            this.modelController = modelController;

            this.modelController.$parsers.unshift((viewValue: any) => this.parse(viewValue));
            this.modelController.$formatters.push((modelValue: any) => this.format(modelValue));
        }

        public format(modelValue: any): any {
            throw new NotImplementedException('Format function not defined');
        }

        public parse(viewValue: any): any {
            throw new NotImplementedException('Parse function not defined');
        }
    }

} 