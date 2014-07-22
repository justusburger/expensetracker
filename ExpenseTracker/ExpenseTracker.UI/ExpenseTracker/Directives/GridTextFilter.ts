module ExpenseTracker.Directives {

    export class GridTextFilter extends DirectiveBase {

        public static Name: string = 'gridTextFilter';
        public static TemplateUrl: string = 'ExpenseTracker/Views/GridTextFilter.html';
        public dataProvider: ExpenseTracker.Services.DataProvider<any>;
        public text: string;
        public filterFields: string[];

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super(scope, element, attributes);

            if (!attributes['source'])
                throw new ArgumentException('source', 'Grid text filter data provider property not set');

            this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);

            if (!attributes['filterFields'])
                throw new ArgumentException('filterFields', 'Grid text filter filter fields property not set');

            this.filterFields = attributes['filterFields'].split(' ');

            this.scope.$watch(() => this.text, (text: string, oldText: string) => {
                if (typeof text === 'undefined' && typeof oldText === 'undefined')
                    return;
                this.filter();
            });
        }

        public filter(): void {
            this.dataProvider.filter(GridTextFilter.Name, this.filters(this.text));
        }

        public filters(query: string): Models.IDataProviderFilter[] {
            var filters: Models.IDataProviderFilter[] = [];
            this.filterFields.forEach(field => {
                filters.push({
                    field: field,
                    query: query
                });
            });
            return filters;
        }

        public clear(): void {
            var hadText = !!this.text;
            this.text = '';
            if (hadText)
                this.filter();
        }
    }

    angular.module('ExpenseTracker.Directives').directive(GridTextFilter.Name, (): ng.IDirective => <ng.IDirective>{
        replace: true,
        restrict: 'E',
        scope: true,
        templateUrl: GridTextFilter.TemplateUrl,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) => new GridTextFilter(scope, element, attributes)
    });

}   