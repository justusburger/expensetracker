module ExpenseTracker.Directives {

    export class DateFilter extends DirectiveBase {

        public static Name: string = 'dateFilter';
        public static TemplateUrl: string = 'ExpenseTracker/Views/DateFilter.html';
        public dataProvider: ExpenseTracker.Services.DataProvider<any>;
        public dates = {
            from: null,
            to: null
        };
        public isCustom: boolean;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super(scope, element, attributes);

            if (!attributes['source'])
                throw new ArgumentException('source', 'Grid date filter data provider property not set');

            this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);
        }

        public filter(): void {
            if (this.dates.from && this.dates.to)
                this.dataProvider.filter(DateFilter.Name, [{
                    field: 'date',
                    query: this.dates.from.toISOString() + '|' + this.dates.to.toISOString()
                }]);
            else
                this.dataProvider.filter(DateFilter.Name, []);
        }

        public clear(): void {
            this.isCustom = false;
            var hadDate = !!this.dates.from && !!this.dates.to;
            this.dates.from = undefined;
            this.dates.to = undefined;
            if (hadDate)
                this.filter();
        }

        public get isClear(): boolean {
            return !this.dates.from && !this.dates.to && !this.isCustom;
        }

        public today(): void {
            this.isCustom = false;
            var now = new Date();
            this.dates.from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            this.dates.to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            this.filter();
        }

        public get isToday(): boolean {
            if (this.isClear || this.isCustom)
                return false;

            var now = new Date();
            return this.dates.from.getTime() == (new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime() &&
                this.dates.to.getTime() == (new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)).getTime();
        }

        public thisWeek(): void {
            this.isCustom = false;
            var now = new Date();
            var firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            var lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
            this.dates.from = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate());
            this.dates.to = new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate(), 23, 59, 59);
            this.filter();
        }

        public get isThisWeek(): boolean {
            if (this.isClear || this.isCustom)
                return false;

            var now = new Date();
            var firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            var lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
            if (this.dates.from.getTime() !== (new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate())).getTime())
                return false;
            if (this.dates.to.getTime() !== (new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate(), 23, 59, 59)).getTime())
                return false;
            return true;
        }

        public thisMonth(): void {
            this.isCustom = false;
            var now = new Date();
            this.dates.from = new Date(now.getFullYear(), now.getMonth());
            this.dates.to = new Date(now.getFullYear(), now.getMonth() + 1, -1, 23, 59, 59);
            this.filter();
        }

        public get isThisMonth(): boolean {
            if (this.isClear || this.isCustom)
                return false;

            var now = new Date();
            return this.dates.from.getTime() == (new Date(now.getFullYear(), now.getMonth())).getTime() &&
                this.dates.to.getTime() == (new Date(now.getFullYear(), now.getMonth() + 1, -1, 23, 59, 59)).getTime();
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