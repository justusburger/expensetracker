module ExpenseTracker.Controllers {

    export class Register extends ControllerBase {

        public static Name: string = 'Register';
        public form: ExpenseTracker.Models.IRegistrationForm = <ExpenseTracker.Models.IRegistrationForm>{};

        constructor(scope: ng.IScope) {
            super(scope);
            this.form = {
                name: 'Justus Burger',
                email: 'justusburger@gmail.com',
                password: 'P@ssw0rd',
                acceptTermsAndConditions: true,
                newsletterSignup: false
            };
        }

        public register(): void {
            this.registrationService.register(this.form).then((response) => {
                console.log('Done in controller', response);
            });
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(Register.Name, [
        '$scope',
        (scope: ng.IScope) => new Register(scope)
    ]);
}  