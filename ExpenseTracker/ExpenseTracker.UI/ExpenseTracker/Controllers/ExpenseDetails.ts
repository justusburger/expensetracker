module ExpenseTracker.Controllers {

    export class ExpenseDetails extends ControllerBase {

        public static Name: string = 'ExpenseDetails';
        public form: Models.IExpense;
        public expenseTypes: Models.IExpenseType[];

        constructor(scope: ng.IScope) {
            super(scope);
        }

        public get isEditing(): boolean {
            return !!this.expenseId;
        }

        public get expenseId(): number {
            return this.routeParamsService['id'];
        }

        public onInitialized(): void {
            if (this.isEditing) {
                this.beginUpdate();
                this.expenseService.getById(this.expenseId).then((expense: Models.IExpense) => {
                    this.form = expense;
                    this.endUpdate();
                }, () => this.endUpdate());
            } else 
                this.form = <any>{};

            this.beginUpdate();
            this.expenseTypeService.getAll().then((expenseTypes) => {
                this.expenseTypes = expenseTypes;
                this.endUpdate();
            }, () => this.endUpdate());
        }

        public save(): void {
            if (this.isEditing) {
                this.beginUpdate();
                this.expenseService.update(this.form).then(() => {
                    this.alertService.success("Expense updated");
                    this.locationService.path("/expenses");
                }, () => this.endUpdate());
            } else {
                this.beginUpdate();
                this.expenseService.create(this.form).then(() => {
                    this.alertService.success("Expense added");
                    this.locationService.path("/expenses");
                }, () => this.endUpdate());
            }
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(ExpenseDetails.Name, [
        '$scope',
        (scope: ng.IScope) => new ExpenseDetails(scope)
    ]);
}    