module ExpenseTracker.Controllers {

    export class ExpenseDetails extends ControllerBase {

        public static Name: string = 'ExpenseDetails';
        public get isSecured(): boolean { return true; }
        public form: Models.IExpense;
        public tags: Models.ITag[];

        constructor(scope: ng.IScope) {
            super(scope);
            this.beginUpdate();
        }

        public get isEditing(): boolean {
            return !!this.expenseId;
        }

        public get expenseId(): number {
            return this.routeParamsService['id'];
        }

        public initialize(): ng.IPromise<void> {
            return super.initialize().then(() => {
                if (this.isEditing) {
                    this.expenseApiResourceService.get(this.expenseId).then((expense: Models.IExpense) => {
                        this.form = expense;
                        this.endUpdate();
                    }, () => this.endUpdate());
                } else {
                    this.form = <any>{};
                    this.endUpdate();
                }

                this.beginUpdate('tags');
                this.expenseApiResourceService.getAllTags().then((tags: Models.ITag[]) => {
                    this.tags = tags;
                    this.endUpdate('tags');
                }, () => this.endUpdate('tags'));
            });
        }

        public save(): void {
            if (this.isEditing) {
                this.beginUpdate();
                this.expenseApiResourceService.update(this.form).then(() => {
                    this.alertService.success("Expense updated");
                    this.locationService.path("/expenses");
                }, () => this.endUpdate());
            } else {
                this.beginUpdate();
                this.expenseApiResourceService.create(this.form).then(() => {
                    this.alertService.success("Expense added");
                    this.locationService.path("/expenses");
                }, () => this.endUpdate());
            }
        }

        public tagsSource(query: string): ng.IPromise<Models.ITag[]> {
            var filteredTags = this.filterService('filter')(this.tags, query);
            return this.promiseService.when(filteredTags);
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(ExpenseDetails.Name, [
        '$scope',
        (scope: ng.IScope) => new ExpenseDetails(scope)
    ]);
}    