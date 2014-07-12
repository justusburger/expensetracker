module ExpenseTracker.Controllers {

    export class Register extends ControllerBase {

        public static Name: string = 'Register';
        public form: ExpenseTracker.Model.IRegistrationForm = <ExpenseTracker.Model.IRegistrationForm>{};

        constructor() {
            super();
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(Register.Name, () => new Register());
}  