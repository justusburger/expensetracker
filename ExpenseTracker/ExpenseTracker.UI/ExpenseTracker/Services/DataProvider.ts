module ExpenseTracker.Services {

    export class DataProvider<T> extends Component {
        private selectorFn: (query: Models.IDataProviderQuery) => ng.IPromise<Models.IDataProviderResults<T>>;
        private items: T[];
        public query: Models.IDataProviderQuery;
        private _filters: any = {};

        constructor(selectorFn: (query: Models.IDataProviderQuery) => ng.IPromise<Models.IDataProviderResults<T>>) {
            super();
            this.selectorFn = selectorFn;
            this.query = this.defaultQuery;
        }

        public get defaultQuery(): Models.IDataProviderQuery {
            return {
                page: 1,
                pageSize: 20,
                filters: this.filters
            };
        }

        public reset(): void {
            this.load(this.defaultQuery);
        }
        
        private load(query: Models.IDataProviderQuery): void {
            this.beginUpdate();
            this.selectorFn(query).then((results: Models.IDataProviderResults<T>) => {
                this.items = results.items;
                this.query = results.query;
                this.endUpdate();
            });
        }

        public setPage(page: number): void {
            this.load({
                page: page,
                pageSize: this.query.pageSize,
                filters: this.filters
            });
        }

        public filter(source: string, filters: Models.IDataProviderFilter[]): void {
            this._filters[source] = filters;
            this.load({
                page: this.query.page,
                pageSize: this.query.pageSize,
                filters: this.filters
            });
        }

        public get filters(): string[] {
            var results: string[] = [];
            for (var source in this._filters) {
                var sourceFilters: Models.IDataProviderFilter[] = <any>this._filters[source];
                if (sourceFilters && sourceFilters.any()) {
                    sourceFilters.forEach(sourceFilter => {
                        if (typeof sourceFilter.query !== 'undefined' && sourceFilter.query !== null && sourceFilter.query.toString().trim() !== '')
                            results.push(sourceFilter.field + ':' + sourceFilter.query);
                    });
                }
            }
            return results;
        }

    }

    export class DataProviderFactory {

        public static Name: string = 'DataProvider';

        public create<T>(selectorFn: (query: any) => ng.IPromise<Models.IDataProviderResults<T>>): DataProvider<T> {
            return new DataProvider(selectorFn);
        }
    }

    angular.module('ExpenseTracker.Services').factory(DataProviderFactory.Name, () => new DataProviderFactory());

}    