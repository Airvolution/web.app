///<reference path='../../../../typings/tsd.d.ts'/>

export = MyProfileController;

class MyProfileController {
    public userProfile;
    public userForm;
    public passwordForm;
    public userFormData;
    public passwordFormData;

    public alertTimeout = 5000;
    public passwordAlert = undefined;
    public profileAlert = undefined;

    public modelOptions;

    public static $inject = ['APIService', '$scope'];

    constructor(private APIService, private $scope) {
        var self = this;
        var unregister = $scope.$watch('ctrl.userProfile', (val)=> {
            self.userFormData = angular.copy(self.userProfile);
        });
        APIService.getUserProfile().then((profile)=> {
            this.userProfile = profile;
        });
        $scope.$on('$destroy', ()=> {
            unregister();
        });

        this.modelOptions = {updateOn: 'default blur', debounce: {default: 250, blur: 0}};

    }

    public onSubmit() {
        if(!this.userForm.$valid){
            this.profileAlert = {type: "danger", message: "Profile was not saved due to errors."};
            this.userForm.$submitted = true;
            return;
        }
        var self = this;
        this.APIService.updateUserProfile(this.userFormData).then((profile)=> {
            self.profileAlert = {type: "success", message: "Profile successfully updated."};
            self.userProfile = profile;
        });
    }

    public resetPassword() {
        var self = this;
        this.APIService.resetUserPassword(this.passwordFormData.password).then((result)=> {
            this.passwordFormData = undefined;
            if (result) {
                self.passwordAlert = {type: 'success', message: 'Your password has been successfully updated.'};
            } else {
                self.passwordAlert = {type: 'danger', message: 'Sorry, we were unable to update your password.'};
            }
        });
    }

    public onAlertClose(alert){
        if(alert == this.profileAlert){
            this.profileAlert = undefined;
        }else{
            this.passwordAlert = undefined;
        }
    }


}
