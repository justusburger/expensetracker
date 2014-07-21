module ExpenseTracker.Directives {

    export class TagsFilter extends DirectiveBase {

        public static Name: string = 'tagsFilter';
        public static TemplateUrl: string = 'ExpenseTracker/Views/TagsFilter.html';
        public dataProvider: ExpenseTracker.Services.DataProvider<any>;
        public tags: Models.ITag[];
        public selectedTags: Models.ITag[] = [];
        public isAndFilter: boolean;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super(scope, element, attributes);

            if (!attributes['source'])
                throw new ArgumentException('source', 'Grid text filter data provider property not set');

            this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);
        }

        public initialize(): ng.IPromise<void> {
            return super.initialize().then(() => {
                this.beginUpdate();
                return this.expenseService.getAllTags().then((tags: Models.ITag[]) => {
                    this.tags = tags;
                    this.endUpdate();
                }, () => this.endUpdate());
            });
        }

        public toggleFilterType(): void {
            this.isAndFilter = !this.isAndFilter;
            if (this.selectedTags.any())
                this.filter();
        }
        
        public get filterTypeTooltip(): string {
            if (this.isAndFilter)
                return 'Show expenses that contains ALL selected tags';
            return 'Show expenses that contain ANY of the selected tags';
        }

        public toggle(tag: Models.ITag): void {
            if (this.isSelected(tag))
                this.selectedTags.remove(tag);
            else
                this.selectedTags.push(tag);
            this.filter();
        }

        public filter(): void {
            var query = this.selectedTags.select(a => a.text).join(this.isAndFilter ? '&' : '|');
            this.dataProvider.filter('tags', [{ field: 'tags', query: query }]);
        }

        public isSelected(tag: Models.ITag): boolean {
            return this.selectedTags.contains(tag);
        }

    }

    angular.module('ExpenseTracker.Directives').directive(TagsFilter.Name, (): ng.IDirective => <ng.IDirective>{
        replace: true,
        restrict: 'E',
        scope: true,
        templateUrl: TagsFilter.TemplateUrl,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) => new TagsFilter(scope, element, attributes)
    });

}    