module ExpenseTracker.Controllers {

    export class ExpenseList extends ControllerBase {

        public static Name: string = 'ExpenseList';
        public form: any = {};
        public expenses: Models.IExpense[];
        public expenseTypes: Models.IExpenseType[];
        public removeConfirmationPopup: Models.IPopup;

        constructor(scope: ng.IScope) {
            super(scope);

            this.removeConfirmationPopup = {
                title: 'Remove expense',
                text: 'Are you sure you want to remove <strong>{{ description }}</strong>?',
                style: Models.PopupStyleEnum.Danger,
                size: Models.PopupSizeEnum.Small,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: 'Remove',
                        style: Models.PopupButtonStyleEnum.Danger,
                        clickFn: expense => this.removeConfirmed(expense)
                    }
                ]
            };
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
        
        public remove(expense: Models.IExpense): void {
            this.popupService.show(this.removeConfirmationPopup, expense);
        }

        public removeConfirmed(expense: Models.IExpense): void {
            this.beginUpdate();
            this.expenseService.delete(expense.id).then(() => {
                this.endUpdate();
                this.expenses.remove(expense);
                this.alertService.success('Expense removed');
            }, () => this.endUpdate());
        }
    }

    angular.module('ExpenseTracker.Controllers').controller(ExpenseList.Name, [
        '$scope',
        (scope: ng.IScope) => new ExpenseList(scope)
    ]);
}   