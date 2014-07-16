module ExpenseTracker.Controllers {

    export class ExpenseList extends ControllerBase {

        public static Name: string = 'ExpenseList';
        public form: any = {};
        public expenses: Models.IExpense[];
        public expenseTypes: Models.IExpenseType[];

        constructor(scope: ng.IScope) {
            super(scope);
        }

        public onInitialized(): void {
            this.beginUpdate();
            this.expenseService.getAll().then((expenses) => {
                this.expenses = expenses;
                this.endUpdate();
            });
            this.beginUpdate();
            this.expenseTypeService.getAll().then((expenseTypes) => {
                this.expenseTypes = expenseTypes;
                this.endUpdate();
            });
        }
        
    }

    angular.module('ExpenseTracker.Controllers').controller(ExpenseList.Name, [
        '$scope',
        (scope: ng.IScope) => new ExpenseList(scope)
    ]);
}   