module ExpenseTracker.Services {

    interface IExpenseResourceClass extends ng.resource.IResourceClass<ng.resource.IResource<Models.IExpense>> {
        update: (expense: Models.IExpense, onSuccess: (response: Models.IExpense) => void, onError: Function) => void;
        getAllTags: (onSuccess: (tags: Models.ITag[]) => void, onError: Function) => void;
    }

    export class Expense extends ApiResource {

        public static Name: string = 'Expense';

        private expenseResource: IExpenseResourceClass;

        constructor() {
            super();
            this.expenseResource = <IExpenseResourceClass>this.resourceService(this.apiBaseUrl + '/expense/:id', null, {
                update: { method: 'PUT' },
                getAllTags: { method: 'GET', url: this.apiBaseUrl + '/expense/tags', isArray: true },
                query: { method: 'GET' }
            });
        }

        public getAll(query: Models.IDataProviderParams): ng.IPromise<Models.IDataProviderResults<Models.IExpense>> {
            var defer = this.promiseService.defer<Models.IDataProviderResults<Models.IExpense>>();
            this.expenseResource.query(query,
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public getById(id: number): ng.IPromise<Models.IExpense> {
            var defer = this.promiseService.defer<Models.IExpense>();
            this.expenseResource.get({ id: id },
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public create(expense: Models.IExpense): ng.IPromise<Models.IExpense> {
            var defer = this.promiseService.defer<Models.IExpense>();
            this.expenseResource.save(expense,
                (response) => this.defaultOnSuccess(response, defer),
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
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public getAllTags(): ng.IPromise<Models.ITag[]> {
            var defer = this.promiseService.defer<Models.ITag[]>();
            this.expenseResource.getAllTags(
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

    }

    angular.module('ExpenseTracker.Services').factory(Expense.Name, () => new Expense());

}    