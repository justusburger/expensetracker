module ExpenseTracker.Controllers {

    export class ExpenseDetails extends ControllerBase {

        public static Name: string = 'ExpenseDetails';
        public form: Models.IExpense = <Models.IExpense>{};
        public expenseTypes: Models.IExpenseType[];

        constructor(scope: ng.IScope) {
            super(scope);
        }

        public onInitialized(): void {
            this.beginUpdate();
            this.expenseTypeService.getAll().then((expenseTypes) => {
                this.expenseTypes = expenseTypes;
                this.endUpdate();
            }, () => this.endUpdate());
        }

        public add(): void {
            console.log(this.form);
            return;

            this.beginUpdate();
            this.expenseService.create(this.form).then(() => {
                this.alertService.success("Expense added");
                this.locationService.path("/expenses");
            }, () => this.endUpdate());
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(ExpenseDetails.Name, [
        '$scope',
        (scope: ng.IScope) => new ExpenseDetails(scope)
    ]);
}    