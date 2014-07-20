module ExpenseTracker.Directives {

    export class GridPager extends DirectiveBase {

        public static Name: string = 'gridPager';
        public static TemplateUrl: string = 'ExpenseTracker/Views/GridPager.html';
        public dataProvider: ExpenseTracker.Services.DataProvider<any>;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super(scope, element, attributes);

            if (!attributes['source'])
                throw new ArgumentException('source', 'Grid pager data provider property not set');

            this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);
        }

        public get pages(): any[] {
            if (!this.dataProvider || !this.dataProvider.query) return [];
            var results = [];
            if (this.last < 5) {
                for (var i = 0; i < this.last; i++)
                    results.push(i + 1);
            } else {
                for (var i = 0; i < 5; i++) {
                    var page = this.currentPage + (-2 + i);
                    if (page > 0 && page <= this.last)
                        results.push(page);
                }
            }
            return results;
        }

        public get currentPage(): number {
            if (!this.dataProvider || !this.dataProvider.query) return null;
            return this.dataProvider.query.page;
        }

        public setPage(page: number): void {
            if (!this.dataProvider || !this.dataProvider.query) return;
            this.dataProvider.setPage(page);
        }

        public get showPrevious(): boolean {
            if (!this.dataProvider || !this.dataProvider.query) return false;
            return this.currentPage > 1;
        }

        public get showNext(): boolean {
            if (!this.dataProvider || !this.dataProvider.query) return false;
            return this.currentPage < this.last;
        }

        public previous(): void {
            if (!this.showPrevious) return;
            this.dataProvider.setPage(this.currentPage - 1);
        }

        public next(): void {
            if (!this.showNext) return;
            this.dataProvider.setPage(this.currentPage + 1);
        }

        public get showFirst(): boolean {
            if (!this.dataProvider || !this.dataProvider.query) return false;
            return this.pages.first() > 1;
        }

        public get showFirstEllipse(): boolean {
            if (!this.dataProvider || !this.dataProvider.query) return false;
            return this.pages.first() > 2;
        }

        public get showLast(): boolean {
            if (!this.dataProvider || !this.dataProvider.query) return false;
            return this.pages.last() < this.last;
        }

        public get showLastEllipse(): boolean {
            if (!this.dataProvider || !this.dataProvider.query) return false;
            return this.pages.last() < (this.last - 1);
        }

        public get last(): number {
            if (!this.dataProvider || !this.dataProvider.query) return 0;
            return this.dataProvider.query.pageCount;
        }
    }

    angular.module('ExpenseTracker.Directives').directive(GridPager.Name, (): ng.IDirective => <ng.IDirective>{
        replace: true,
        restrict: 'E',
        scope: true,
        templateUrl: GridPager.TemplateUrl,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) => new GridPager(scope, element, attributes)
    });

}  