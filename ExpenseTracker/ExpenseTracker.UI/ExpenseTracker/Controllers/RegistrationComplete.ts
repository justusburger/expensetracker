module ExpenseTracker.Controllers {

    export class RegistrationComplete extends ControllerBase {

        public static Name: string = 'RegistrationComplete';

        constructor(scope: ng.IScope) {
            super(scope);
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(RegistrationComplete.Name, [
        '$scope',
        (scope: ng.IScope) => new RegistrationComplete(scope)
    ]);
}   