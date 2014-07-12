module ExpenseTracker.Controllers {
    export class Home extends ControllerBase {

        public static Name: string = 'Home';

        constructor() {
            super();
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(Home.Name, () => new Home());
} 