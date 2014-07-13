module ExpenseTracker.Directives {

    export class Validate extends DirectiveBase {

        public static Name: string = 'validate';
        public static TemplateUrl: string = 'ExpenseTracker/Views/Validate.html';
        public static ErrorMessages: any = {
            'email': 'Invalid email address. Example: john.smith@email.com',
            'required': 'This field is required'
        };

        public modelController: ng.INgModelController;
        public container: JQuery;
        public spacer: JQuery;
        public validIndicator: JQuery;
        public invalidIndicator: JQuery;
        public hadFocus: boolean = false;
        public failedValidationMessage: string;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController, container: JQuery) {
            super(scope, element, attributes);
            if (!attributes['name'])
                throw new ArgumentException('name', 'Input does not have a name attribute.');

            this.modelController = modelController;
            this.container = container;
            this.validIndicator = this.container.find('.valid');
            this.invalidIndicator = this.container.find('.invalid');
            this.spacer = this.container.find('.spacer');

            scope.$watch(() => this.modelController.$viewValue, () => this.showValidity());
            element.on('blur', () => {
                this.scope.$apply(() => {
                    this.hadFocus = true;
                    this.showValidity();
                });
            });

            if (attributes[Validate.Name + 'Watch'])
                this.scope.$watch(attributes[Validate.Name + 'Watch'], () => {
                    this.modelController.$setViewValue(this.modelController.$viewValue);
                    this.showValidity();
                });
        }

        public showValidity(): void {
            this.spacer.hide();
            this.validIndicator.hide();
            this.invalidIndicator.hide();

            if (!this.hadFocus)
                this.spacer.show();
            else {
                if (this.modelController.$valid)
                    this.validIndicator.show();
                if (this.modelController.$invalid) {
                    this.invalidIndicator.show();
                    var failedValidation;
                    for (var key in this.modelController.$error) {
                        if (this.modelController.$error[key]) {
                            failedValidation = key;
                            break;
                        }
                    }
                    this.failedValidationMessage = Validate.ErrorMessages[failedValidation];
                }
            }
        }
        
    }

    angular.module('ExpenseTracker.Directives').directive(Validate.Name, ['$compile', (compileService: ng.ICompileService): ng.IDirective => <ng.IDirective>{
        restrict: 'A',
        require: 'ngModel',
        scope: true,
        templateUrl: Validate.TemplateUrl,
        compile: (element: JQuery, attributes: ng.IAttributes) => {
            var container = element.find('.form-validity');
            container.insertAfter(element);
            return (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) => {
                var validateScope = scope.$new();
                new Validate(validateScope, element, attributes, modelController, container);
                compileService(container)(validateScope);
            }
        }    
    }]);

} 