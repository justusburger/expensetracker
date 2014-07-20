module ExpenseTracker.Services {

    export class DataProvider<T> extends Component {
        private selectorFn: (query: Models.IDataProviderParams) => ng.IPromise<Models.IDataProviderResults<T>>;
        private items: T[];
        public query: Models.IDataProviderParams;
        public pageSize: number;

        constructor(selectorFn: (query: Models.IDataProviderParams) => ng.IPromise<Models.IDataProviderResults<T>>) {
            super();
            this.selectorFn = selectorFn;
            this.pageSize = 2;
        }

        public reset(): void {
            this.load({
                page: 1,
                pageSize: this.pageSize
            });
        }

        public initialize(): void {
            this.reset();
        }

        private load(query: Models.IDataProviderParams): void {
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
                pageSize: this.pageSize
            });
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