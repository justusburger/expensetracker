module ExpenseTracker.Services.ApiResource {
    
    export class ApiResourceService extends Component {

        constructor() {
            super();
        }

        public defaultOnError<T>(response: Models.IErrorResponse, defer: ng.IDeferred<T>, expectedErrorsTypes?: string[]): void {
            if (angular.isString(response.data))
                response.data = JSON.parse(<string>response.data);
            if (response.data && !Enumerable.From(expectedErrorsTypes).Contains(response.data.type)) {
                if (response.status === 401) {
                    this.cacheService.profile = undefined;
                    this.locationService.path('/sign-in/expired');
                } else {
                    this.alertService.error('An unexpected error occured: ' + response.data.message);
                }
            } 
            defer.reject(response);
        }

        public defaultOnSuccess<T>(response: T, defer: ng.IDeferred<T>): void {
            defer.resolve(response);
        }

        public asString(data: string): any {
            if(data[0] == '"')
                return { content: data.substr(1, data.length - 2) };

            return data;
        }

        public asBoolean(data: string): any {
            if(data.toLowerCase() === 'true' || data.toLowerCase() === 'false')
                return { content: data === 'true' };
            return data;
        }

    }

} 