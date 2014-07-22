module ExpenseTracker {

    export interface IControllerScope extends ng.IScope {
        $controller: ControllerBase;
    }

    export class ControllerBase extends SecuredComponent {

        public scope: IControllerScope;

        constructor(scope: ng.IScope) {
            super();

            this.scope = <IControllerScope>scope;
            this.scope.$controller = this;
        }

    }

} 