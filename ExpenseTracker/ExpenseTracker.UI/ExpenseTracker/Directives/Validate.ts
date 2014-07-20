module ExpenseTracker.Directives {

    export class Validate extends DirectiveBase {

        public static Name: string = 'validate';
        public static ErrorMessages: any = {
            'email': 'Invalid email address. Example: john.smith@email.com',
            'required': 'This field is required'
        };

        public modelController: ng.INgModelController;
        public container: JQuery;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) {
            super(scope.$new(), element, attributes);
            if (!attributes['name'])
                throw new ArgumentException('name', 'Input does not have a name attribute.');

            if (!attributes[Validate.Name])
                throw new ArgumentException('error container', 'Input does not have an error container specified.');

            this.modelController = modelController;

            this.container = angular.element(attributes[Validate.Name]).addClass('form-validity');
            this.container.append('<i class="glyphicon glyphicon-ok valid" ng-show="$directive.valid"></i>');
            this.container.append('<i class="glyphicon glyphicon-exclamation-sign invalid" ng-show="$directive.invalid" popover="{{ $directive.failedValidationMessage }}" popover-trigger="mouseenter" popover-placement="left"></i>');
            this.compileService(this.container)(this.scope);

            if (attributes[Validate.Name + 'Watch'])
                this.scope.$watch(attributes[Validate.Name + 'Watch'], () => this.modelController.$setViewValue(this.modelController.$viewValue));
        }

        public get valid(): boolean {
            return this.modelController.$valid;
        }

        public get invalid(): boolean {
            return this.modelController.$invalid; 
        }

        public get failedValidationMessage(): string {
            var failedValidation;
            for (var key in this.modelController.$error) {
                if (this.modelController.$error[key]) {
                    failedValidation = key;
                    break;
                }
            }
            return <string>Validate.ErrorMessages[failedValidation];
        }
        
    }

    angular.module('ExpenseTracker.Directives').directive(Validate.Name, (): ng.IDirective => <ng.IDirective>{
        restrict: 'A',
        require: 'ngModel',
        scope: true,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) => new Validate(scope, element, attributes, modelController)
    });

} 