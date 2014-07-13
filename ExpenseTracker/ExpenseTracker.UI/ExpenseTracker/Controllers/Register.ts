module ExpenseTracker.Controllers {

    export class Register extends ControllerBase {

        public static Name: string = 'Register';
        public form: ExpenseTracker.Model.IRegistrationForm = <ExpenseTracker.Model.IRegistrationForm>{};

        constructor(scope: ng.IScope) {
            super(scope);
            scope['name'] = 'Justus';
        }

        public register(): void {
            console.log(this.form);
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(Register.Name, [
        '$scope',
        (scope: ng.IScope) => new Register(scope)
    ]);
}  