module ExpenseTracker.Services.ApiResource {
    
    interface IUserResourceClass {
        get: (successFn: (user: Models.IUser) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        register: (user: Models.IUser, successFn: (user: Models.IUser) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        update: (user: Models.IUser, successFn: (user: Models.IUser) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        resetPassword: (resetPasswordRequest: Models.IResetPasswordRequest, successFn: () => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        verifyResetPassword: (params: { resetPasswordToken: string }, successFn: (response: { content: string }) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        verifyEmail: (params: { emailToken: string }, successFn: (response: { content: string }) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        signIn: (user: Models.IUser, successFn: (response: { content: string }) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        signOut: (successFn: () => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        emailUnique: (params: { email: string }, successFn: (response: { content: boolean }) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
        availableOptions: (successFn: (options: Models.IUserAvailableOptions) => void, errorFn: (response: Models.IErrorResponse) => void) => void;
    }

    export class UserApiResourceService extends ApiResourceService {
        
        public static Name: string = 'UserApiResourceService';
        private userResource: IUserResourceClass;

        constructor() {
            super();
            this.userResource = <IUserResourceClass><any>this.resourceService(this.apiBaseUrl + '/user', null, {
                get: { method: 'GET' },
                register: { method: 'POST' },
                update: { method: 'PUT' },
                resetPassword: { method: 'POST', url: this.apiBaseUrl + '/user/reset-password' },
                verifyResetPassword: { method: 'GET', url: this.apiBaseUrl + '/user/verify-reset-password/:resetPasswordToken', transformResponse: this.asString },
                verifyEmail: { method: 'GET', url: this.apiBaseUrl + '/user/verify-email/:emailToken', transformResponse: this.asString },
                signIn: { method: 'POST', url: this.apiBaseUrl + '/user/sign-in', transformResponse: this.asString },
                signOut: { method: 'DELETE', url: this.apiBaseUrl + '/user/sign-out' },
                emailUnique: { method: 'GET', url: this.apiBaseUrl + '/user/email-unique', transformResponse: this.asBoolean },
                availableOptions: { method: 'GET', url: this.apiBaseUrl + '/user/available-options' }
            });
        }

        public get(): ng.IPromise<Models.IUser> {
            var defer = this.promiseService.defer<Models.IUser>();
            this.userResource.get(
                (user: Models.IUser) => this.defaultOnSuccess(user, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public register(user: Models.IUser): ng.IPromise<Models.IUser> {
            var defer = this.promiseService.defer<Models.IUser>();
            this.userResource.register(user,
                (user: Models.IUser) => this.defaultOnSuccess(user, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public update(user: Models.IUser): ng.IPromise<Models.IUser> {
            var defer = this.promiseService.defer<Models.IUser>();
            this.userResource.update(user,
                (user: Models.IUser) => this.defaultOnSuccess(user, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public resetPassword(resetPasswordRequest: Models.IResetPasswordRequest): ng.IPromise<void> {
            var defer = this.promiseService.defer<void>();
            this.userResource.resetPassword(resetPasswordRequest,
                () => this.defaultOnSuccess(<any>true, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public verifyResetPassword(resetPasswordToken: string): ng.IPromise<string> {
            var defer = this.promiseService.defer<string>();
            this.userResource.verifyResetPassword({ resetPasswordToken: resetPasswordToken },
                (response: { content: string }) => this.defaultOnSuccess(response.content, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public verifyEmail(emailToken: string): ng.IPromise<string> {
            var defer = this.promiseService.defer<string>();
            this.userResource.verifyEmail({ emailToken: emailToken },
                (response: { content: string }) => this.defaultOnSuccess(response.content, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public signIn(user: Models.IUser): ng.IPromise<string> {
            var defer = this.promiseService.defer<string>();
            this.userResource.signIn(user,
                (response: { content: string }) => this.defaultOnSuccess(response.content, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer, [
                    ExpenseTracker.Errors.IncorrectUsernamePasswordCombinationException,
                    ExpenseTracker.Errors.EmailAddressNotVerifiedException,
                    ExpenseTracker.Errors.UserAccountLockedException
                ])
            );
            return defer.promise;
        }

        public signOut(): ng.IPromise<void> {
            var defer = this.promiseService.defer<void>();
            this.userResource.signOut(
                () => this.defaultOnSuccess(<any>true, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public emailUnique(email: string): ng.IPromise<boolean> {
            var defer = this.promiseService.defer<boolean>();
            this.userResource.emailUnique({ email: email },
                (response: { content: boolean }) => this.defaultOnSuccess(response.content, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

        public availableOptions(): ng.IPromise<Models.IUserAvailableOptions> {
            var defer = this.promiseService.defer<Models.IUserAvailableOptions>();
            this.userResource.availableOptions(
                (options: Models.IUserAvailableOptions) => this.defaultOnSuccess(options, defer),
                (response: Models.IErrorResponse) => this.defaultOnError(response, defer)
            );
            return defer.promise;
        }

    }


    angular.module('ExpenseTracker.Services').factory(UserApiResourceService.Name, () => new UserApiResourceService());
} 