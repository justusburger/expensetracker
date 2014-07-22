module ExpenseTracker.Services {
    
    export class ApiResource extends Component {

        constructor() {
            super();
        }

        public defaultOnError<T>(response: Models.IErrorResponse, defer: ng.IDeferred<T>, expectedErrors?: number[]): void {
            if (response.data && !Enumerable.From(expectedErrors).Contains(response.data.errorCode)) {
                this.alertService.error('An unexpected error occured: ' + response.data.message);
            }
            defer.reject(response);
        }

        public defaultOnSuccess<T>(response: T, defer: ng.IDeferred<T>): void {
            defer.resolve(response);
        }

    }

} 