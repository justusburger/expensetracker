module ExpenseTracker.Controllers {

    export class Profile extends ControllerBase {

        public static Name: string = 'Profile';
        public get isSecured(): boolean { return true; }
        public form: Models.IFullProfile;

        constructor(scope: ng.IScope) {
            super(scope);
            this.beginUpdate();
        }

        public initialize(): ng.IPromise<void> {
            return super.initialize().then(() => {
                this.profileService.getFullProfile().then((profile: Models.IFullProfile) => {
                    this.form = profile;
                    this.endUpdate();
                }, () => this.endUpdate());
            });
        }

        public save(): void {
            this.beginUpdate();
            this.profileService.update(this.form).then((newProfile: Models.IProfile) => {
                this.cacheService.profile = newProfile;
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