module ExpenseTracker {

    export class SecuredComponent extends Component {

        public get isSecured(): boolean { return false; }

        constructor() {
            super();

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