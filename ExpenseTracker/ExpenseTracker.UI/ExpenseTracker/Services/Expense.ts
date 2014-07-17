module ExpenseTracker.Services {

    export class Expense extends ApiResource {

        public static Name: string = 'Expense';

        public expenseResource: ng.resource.IResourceClass<ng.resource.IResource<Models.IExpense>>;

        constructor() {
            super();
            this.expenseResource = this.resourceService(this.apiBaseUrl + '/expense/:id', null, { update: { method: 'PUT' } });
        }

        public getAll(): ng.IPromise<Models.IExpense[]> {
            var defer = this.promiseService.defer<Models.IExpense[]>();
            this.expenseResource.query(
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
            (<any>this.expenseResource).update(expense,
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

    }

    angular.module('ExpenseTracker.Services').factory(Expense.Name, () => new Expense());

}    