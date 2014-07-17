module ExpenseTracker.Directives {

    export class Datepicker extends DirectiveBase {

        public static Name: string = 'customDatepicker';
        public static TemplateUrl: string = 'ExpenseTracker/Views/Datepicker.html';
        private modelController: ng.INgModelController;
        private value: Date;
        private open: boolean;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) {
            super(scope, element, attributes);
            this.modelController = modelController;
            this.modelController.$render = () => {
                this.value = this.modelController.$viewValue;
                if (!this.value)
                    this.value = new Date();
            };
            this.scope.$watch(() => this.value, () => {
                this.modelController.$setViewValue(this.value);
            });
            this.open = false;
            var onBodyClickHandler = (e) => this.onBodyClick(e);
            this.element.closest('html').on('click', onBodyClickHandler);
            this.scope.$on('$destroy', () => this.element.closest('body').off('click', onBodyClickHandler));
        }

        public onBodyClick(e): void {
            if (this.open && ($(e.target).parents('.custom-datepicker').length > 0 || $(e.target).parents('[role=gridcell]').length > 0))
                return;
            this.scope.$apply(() => this.open = false);
        }

        public toggle(): void {
            this.open = !this.open;
        }

        public now(): void {
            this.value = new Date();
            this.toggle();
        }
        
    }

    angular.module('ExpenseTracker.Directives').directive(Datepicker.Name, (): ng.IDirective => <ng.IDirective>{
        replace: true,
        require: 'ngModel',
        restrict: 'E',
        scope: true,
        templateUrl: Datepicker.TemplateUrl,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) => new Datepicker(scope, element, attributes, modelController)
    });

} 
 