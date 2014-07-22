module ExpenseTracker.Directives {

    export class DateFilter extends DirectiveBase {

        public static Name: string = 'dateFilter';
        public static TemplateUrl: string = 'ExpenseTracker/Views/DateFilter.html';
        public dataProvider: ExpenseTracker.Services.DataProvider<any>;
        public from: Date;
        public to: Date;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super(scope, element, attributes);

            if (!attributes['source'])
                throw new ArgumentException('source', 'Grid date filter data provider property not set');

            this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);
        }

        public filter(): void {
            if (this.from && this.to)
                this.dataProvider.filter(DateFilter.Name, [{
                    field: 'date',
                    query: this.from.toISOString() + '|' + this.to.toISOString()
                }]);
            else
                this.dataProvider.filter(DateFilter.Name, []);
        }

        public clear(): void {
            var hadDate = !!this.from && !!this.to;
            this.from = undefined;
            this.to = undefined;
            if (hadDate)
                this.filter();
        }

        public get isClear(): boolean {
            return !this.from && !this.to;
        }

        public today(): void {
            var now = new Date();
            this.from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            this.to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            this.filter();
        }

        public get isToday(): boolean {
            if (this.isClear)
                return false;

            var now = new Date();
            return this.from.getTime() == (new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime() &&
                this.to.getTime() == (new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)).getTime();
        }

        public thisWeek(): void {
            var now = new Date();
            var firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            var lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
            this.from = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate());
            this.to = new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate(), 23, 59, 59);
            this.filter();
        }

        public get isThisWeek(): boolean {
            if (this.isClear)
                return false;

            var now = new Date();
            var firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            var lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
            if (this.from.getTime() !== (new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate())).getTime())
                return false;
            if (this.to.getTime() !== (new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate(), 23, 59, 59)).getTime())
                return false;
            return true;
        }

        public thisMonth(): void {
            var now = new Date();
            this.from = new Date(now.getFullYear(), now.getMonth());
            this.to = new Date(now.getFullYear(), now.getMonth() + 1, -1, 23, 59, 59);
            this.filter();
        }

        public get isThisMonth(): boolean {
            if (this.isClear)
                return false;

            var now = new Date();
            return this.from.getTime() == (new Date(now.getFullYear(), now.getMonth())).getTime() &&
                this.to.getTime() == (new Date(now.getFullYear(), now.getMonth() + 1, -1, 23, 59, 59)).getTime();
        }
    }

    angular.module('ExpenseTracker.Directives').directive(DateFilter.Name, (): ng.IDirective => <ng.IDirective>{
        replace: true,
        restrict: 'E',
        scope: true,
        templateUrl: DateFilter.TemplateUrl,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) => new DateFilter(scope, element, attributes)
    });

}     