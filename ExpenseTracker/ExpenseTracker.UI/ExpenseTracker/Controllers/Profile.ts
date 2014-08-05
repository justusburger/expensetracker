module ExpenseTracker.Controllers {

    export class Profile extends ControllerBase {

        public static Name: string = 'Profile';
        public get isSecured(): boolean { return true; }
        public form: Models.IUser;
        public options: Models.IUserAvailableOptions;

        constructor(scope: ng.IScope) {
            super(scope);
        }

        public initialize(): ng.IPromise<void> {
            return super.initialize().then(() => {
                this.form = this.cacheService.profile;

                this.beginUpdate();
                this.userApiResourceService.availableOptions().then((options: Models.IUserAvailableOptions) => {
                    this.endUpdate();
                    this.options = options;
                }, () => this.endUpdate());
            });
        }

        public save(): void {
            this.beginUpdate();
            this.userApiResourceService.update(this.form).then((user: Models.IUser) => {
                this.cacheService.profile = user;
                this.profileForm.$setPristine();
                this.alertService.success("Profile updated");
                this.endUpdate();
            }, () => this.endUpdate());
        }

        public get profileForm(): ng.IFormController {
            return this.scope['profileForm'];
        }

        public get isFirstLogin(): boolean {
            return this.routeParamsService['welcome'] === 'welcome';
        }

        public get isResetPassword(): boolean {
            return this.routeParamsService['welcome'] === 'reset-password';
        }

    }

    angular.module('ExpenseTracker.Controllers').controller(Profile.Name, [
        '$scope',
        (scope: ng.IScope) => new Profile(scope)
    ]);
}   