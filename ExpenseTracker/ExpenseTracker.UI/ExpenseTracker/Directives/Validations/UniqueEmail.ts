module ExpenseTracker.Directives.Validations {

    export class UniqueEmail extends ValidationBase {

        public static Name: string = 'uniqueEmail';
        public static ErrorMessage: string = 'This email account has been registered already.';

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) {
            super(scope, element, attributes, modelController);
        }

        public format(modelValue: any): any {
            return modelValue;
        }

        public parse(viewValue: any): any {
            if (typeof viewValue === 'undefined' || viewValue === null || viewValue === '')
                return viewValue;

            this.httpService({ url: this.apiBaseUrl + '/registration/email-unique', method: 'GET', params: { email: viewValue } })
                .success((unique: string) => {
                    this.modelController.$setValidity(UniqueEmail.Name, unique === 'true');
                }).error((response) => console.log(response));

            return viewValue;
        }

    }

    angular.module('ExpenseTracker.Directives').directive(UniqueEmail.Name, (): ng.IDirective => <ng.IDirective>{
        restrict: 'A',
        require: 'ngModel',
        scope: true,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) => new UniqueEmail(scope.$new(), element, attributes, modelController)
    });
    Validate.ErrorMessages[UniqueEmail.Name] = UniqueEmail.ErrorMessage;

}  