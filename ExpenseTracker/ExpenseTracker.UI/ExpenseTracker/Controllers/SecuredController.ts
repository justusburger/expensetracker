module ExpenseTracker {

    export class SecuredController extends ControllerBase {

        public get isSecured(): boolean { return true; }

        constructor(scope: ng.IScope) {
            super(scope);

        }

        public initialize(): ng.IPromise<void> {
            return super.initialize().then(() => {
                if (this.isSecured && !this.isSignedIn) {
                    this.locationService.path('/sign-in');
                    return this.promiseService.reject();
                }
            });
        }

    }

}  