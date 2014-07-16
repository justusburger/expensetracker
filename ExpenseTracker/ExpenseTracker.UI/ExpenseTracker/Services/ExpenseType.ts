module ExpenseTracker.Services {

    export class ExpenseType extends ApiResource {

        public static Name: string = 'ExpenseType';

        public expenseTypeResource: ng.resource.IResourceClass<ng.resource.IResource<Models.IExpenseType>>;
        
        constructor() {
            super();
            this.expenseTypeResource = this.resourceService(this.apiBaseUrl + '/expense-type/:id');
        }

        public getAll(): ng.IPromise<Models.IExpenseType[]> {
            var defer = this.promiseService.defer<Models.IExpenseType[]>();
            this.expenseTypeResource.query(
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public create(expenseType: Models.IExpenseType): ng.IPromise<Models.IExpenseType> {
            var defer = this.promiseService.defer<Models.IExpenseType>();
            this.expenseTypeResource.save(expenseType,
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public delete(id: number): ng.IPromise<void> {
            var defer = this.promiseService.defer<void>();
            this.expenseTypeResource.delete({id: id},
                (response) => this.defaultOnSuccess(response, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

    }

    angular.module('ExpenseTracker.Services').factory(ExpenseType.Name, () => new ExpenseType());

}   