module ExpenseTracker.Directives {

    export class Tags extends DirectiveBase {

        public static Name: string = 'tags';
        public static TemplateUrl: string = 'ExpenseTracker/Views/Tags.html';
        public modelController: ng.INgModelController;
        public value: {text:string}[];

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) {
            super(scope, element, attributes);
            this.value = [];
            this.modelController = modelController;
            this.modelController.$render = () => {
                if (this.modelController.$viewValue && angular.isArray(this.modelController.$viewValue))
                    this.value = (<string[]>this.modelController.$viewValue).select(a => {
                        return { text: a };
                    });
                else
                    this.value = [];
            };
            this.scope.$watchCollection(() => this.value, () => {
                if(this.value)
                    this.modelController.$setViewValue(this.value.select(o => o.text));
            });
        }

        public source(query: string): ng.IPromise<any[]> {
            var defer = this.promiseService.defer<any[]>();
            if (this.attributes['source']) {
                var sourcePromise = <ng.IPromise<any[]>>this.scope.$eval('$parent.' + this.attributes['source'], { $query: query });
                sourcePromise.then((result) => defer.resolve(result));
            } else
                defer.resolve([]);
            return defer.promise;
        }

    }

    angular.module('ExpenseTracker.Directives').directive(Tags.Name, (): ng.IDirective => <ng.IDirective>{
        replace: true,
        restrict: 'E',
        require: 'ngModel',
        scope: true,
        templateUrl: Tags.TemplateUrl,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) => new Tags(scope, element, attributes, modelController)
    });

}   