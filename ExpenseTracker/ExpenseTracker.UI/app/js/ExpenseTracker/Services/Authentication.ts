module ExpenseTracker.Services {

    export class Authentication extends Component {

        public static Name: string = 'Authentication';

        private _authenticationToken: string;
        public get authenticationToken(): string {
            return this._authenticationToken;
        }
        public set authenticationToken(value: string) {
            this._authenticationToken = value;
        }

        public get isAuthenticated(): boolean {
            return !!this._authenticationToken;
        }

        constructor() {
            super();
        }

    }

    angular.module('ExpenseTracker.Services').factory(Authentication.Name, () => new Authentication());

} 