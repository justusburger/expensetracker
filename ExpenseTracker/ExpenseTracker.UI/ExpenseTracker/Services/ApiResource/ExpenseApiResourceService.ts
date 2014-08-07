module ExpenseTracker.Services.ApiResource {

    interface IExpenseResourceClass {
        query: (query: Models.IDataProviderQuery, successFn: (result: Models.IDataProviderResults<Models.IExpense>) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        get: (params: { id: number }, successFn: (result: Models.IExpense) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        create: (expense: Models.IExpense, successFn: (expense: Models.IExpense) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        update: (expense: Models.IExpense, successFn: (expense: Models.IExpense) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        delete: (params: { id: number }, successFn: () => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        getAllTags: (successFn: (tags: Models.ITag[]) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
    }

    export class ExpenseApiResourceService extends ApiResourceService {

        public static Name: string = 'ExpenseApiResourceService';

        private expenseResource: IExpenseResourceClass;

        constructor() {
            super();
            this.expenseResource = <IExpenseResourceClass><any>this.resourceService(this.apiBaseUrl + '/expense', null, {
                query: { method: 'GET' },
                get: { method: 'GET', url: this.apiBaseUrl + '/expense/:id' },
                create: { method: 'POST' },
                update: { method: 'PUT' },
                delete: { method: 'DELETE', url: this.apiBaseUrl + '/expense/:id' },
                getAllTags: { method: 'GET', url: this.apiBaseUrl + '/expense/tags', isArray: true }
            });
        }

        public query(query: Models.IDataProviderQuery): ng.IPromise<Models.IDataProviderResults<Models.IExpense>> {
            var defer = this.promiseService.defer<Models.IDataProviderResults<Models.IExpense>>();

            if (query.download) {
                this.httpService({ method: 'GET', url: this.apiBaseUrl + '/expense/', params: query })
                    .success((data: any, status: number, headers: (headerName: string) => string) => {
                        this.downloadHelperService.download(data, status, headers);
                        defer.resolve(data);
                    })
                    .error((data: any) => this.defaultOnError(data, defer));
            } else {
                this.expenseResource.query(query,
                    (result: Models.IDataProviderResults<Models.IExpense>) => this.defaultOnSuccess(result, defer),
                    (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
                );
            }
            return defer.promise;
        }

        public get(id: number): ng.IPromise<Models.IExpense> {
            var defer = this.promiseService.defer<Models.IExpense>();
            this.expenseResource.get({ id: id },
                (result: Models.IExpense) => this.defaultOnSuccess(result, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public create(expense: Models.IExpense): ng.IPromise<Models.IExpense> {
            var defer = this.promiseService.defer<Models.IExpense>();
            this.expenseResource.create(expense,
                (expense: Models.IExpense) => this.defaultOnSuccess(expense, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public update(expense: Models.IExpense): ng.IPromise<Models.IExpense> {
            var defer = this.promiseService.defer<Models.IExpense>();
            this.expenseResource.update(expense,
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public delete(id: number): ng.IPromise<void> {
            var defer = this.promiseService.defer<void>();
            this.expenseResource.delete({ id: id },
                () => this.defaultOnSuccess(<any>true, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public getAllTags(): ng.IPromise<Models.ITag[]> {
            var defer = this.promiseService.defer<Models.ITag[]>();
            this.expenseResource.getAllTags(
                (tags: Models.ITag[]) => this.defaultOnSuccess(tags, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

    }

    angular.module('ExpenseTracker.Services').factory(ExpenseApiResourceService.Name, () => new ExpenseApiResourceService());

}    