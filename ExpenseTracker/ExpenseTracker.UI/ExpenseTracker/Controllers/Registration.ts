module ExpenseTracker.Controllers {

    export class Registration extends ControllerBase {

        public static Name: string = 'Registration';
        public form: ExpenseTracker.Models.IUser;

        constructor(scope: ng.IScope) {
            super(scope);
            this.form = {};
        }

        public register(): void {
            this.beginUpdate();
            this.userApiResourceService.register(this.form).then(() => {
                this.endUpdate();
                this.locationService.path('/registration-complete');
            });
        }
    }

    angular.module('ExpenseTracker.Controllers').controller(Registration.Name, [
        '$scope',
        (scope: ng.IScope) => new Registration(scope)
    ]);
}  