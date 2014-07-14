module ExpenseTracker.Services {
    
    export class ApiResourceService extends Component {

        constructor() {
            super();
        }

        public get apiBaseUrl(): string {
            return this.injectorService.get('API_BASE_PATH');
        }

        public defaultOnError<T>(response: Models.IErrorResponse, defer: ng.IDeferred<T>, expectedErrors?: number[]): void {
            if (response.data && !Enumerable.From(expectedErrors).Contains(response.data.errorCode)) {
                console.log('Global error handler: ', response);
            }
            defer.reject(response);
        }

        public defaultOnSuccess<T>(response: Models.ISuccessResponse, defer: ng.IDeferred<T>): void {
            defer.resolve(response.data);
        }

    }

} 