module ExpenseTracker.Directives {

    export class Validate extends DirectiveBase {

        public static Name: string = 'validate';
        public static TemplateUrl: string = 'ExpenseTracker/Views/Validate.html';

        public modelController: ng.INgModelController;
        public spacer: JQuery;
        public validIndicator: JQuery;
        public invalidIndicator: JQuery;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) {
            if (!attributes['name'])
                throw new ArgumentException('name', 'Input does not have a name attribute.');

            super(scope, element, attributes);
            this.modelController = modelController;

            this.templateHtml.then((content: string) => {
                $(content).insertAfter(element);
                var container = element.next();
                this.validIndicator = container.find('.valid');
                this.invalidIndicator = container.find('.invalid');
                this.spacer = container.find('.spacer');

                scope.$watch(() => this.modelController.$viewValue, () => this.showValidity());
            });

        }

        public showValidity(): void {
            this.spacer.hide();
            this.validIndicator.hide();
            this.invalidIndicator.hide();

            if (this.modelController.$pristine)
                this.spacer.show();
            else {
                if (this.modelController.$valid)
                    this.validIndicator.show();
                if (this.modelController.$invalid)
                    this.invalidIndicator.show();
            }
        }

        public get templateHtml(): ng.IPromise<string> {
            var defer = this.promiseService.defer();
            var template = this.templateCacheService.get(Validate.TemplateUrl);
            if (template)
                defer.resolve(template);
            else {
                this.httpService.get(Validate.TemplateUrl).then((response: { data: string }) => {
                    this.templateCacheService.put(Validate.TemplateUrl, response.data);
                    defer.resolve(response.data);
                });
            }
            return defer.promise;
        }

    }

    angular.module('ExpenseTracker.Directives').directive(Validate.Name, (): ng.IDirective => <ng.IDirective>{
        restrict: 'A',
        require: 'ngModel',
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) => new Validate(scope, element, attributes, modelController)
    });

} 