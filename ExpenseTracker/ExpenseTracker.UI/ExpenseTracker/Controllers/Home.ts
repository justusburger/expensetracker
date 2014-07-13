module ExpenseTracker.Controllers {
    export class Home extends ControllerBase {

        public static Name: string = 'Home';

        constructor(scope: ng.IScope) {
            super(scope);
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(Home.Name, [
        '$scope',
        (scope: ng.IScope) => new Home(scope)
    ]);
} 