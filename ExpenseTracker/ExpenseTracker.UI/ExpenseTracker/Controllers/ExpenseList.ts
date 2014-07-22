module ExpenseTracker.Controllers {

    export class ExpenseList extends ControllerBase {

        public static Name: string = 'ExpenseList';
        public get isSecured(): boolean { return true; }
        public form: any = {};
        public removeConfirmationPopup: Models.IPopup;
        public expenseDataProvider: ExpenseTracker.Services.DataProvider<Models.IExpense>;

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

            this.expenseDataProvider = this.dataProviderFactory.create(query => this.expenseService.getAll(query));
        }

        public initialize(): ng.IPromise<void> {
            return super.initialize().then(() => this.expenseDataProvider.reset());
        }
        
        public remove(expense: Models.IExpense): void {
            this.popupService.show(this.removeConfirmationPopup, expense);
        }

        public removeConfirmed(expense: Models.IExpense): void {
            this.beginUpdate();
            this.expenseService.delete(expense.id).then(() => {
                this.endUpdate();
                this.expenseDataProvider.refresh();
                this.alertService.success('Expense removed');
            }, () => this.endUpdate());
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(ExpenseList.Name, [
        '$scope',
        (scope: ng.IScope) => new ExpenseList(scope)
    ]);
}   