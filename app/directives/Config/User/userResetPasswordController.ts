/// <reference path="../../../../typings/tsd.d.ts" />

export = UserResetPasswordController;

class UserResetPasswordController {
    public resetForm;
    public resetFormData;

    public modelOptions;
    public alert;
    public alertTimeout;

    public static $inject = ['$scope','APIService'];
    public constructor(private $scope, private APIService){
        $scope.configureModal('Reset your password');

        this.resetFormData = {email: ''};

        this.alert = undefined;
        this.alertTimeout = 5000;
        this.modelOptions = {updateOn: 'default blur', debounce: {default: 250, blur: 0}};
    }

    public onSubmit(){
        this.APIService.sendPasswordResetEmail(this.resetFormData.email).then((succeeded)=>{
            if(succeeded){
                this.alert = {type: 'success',message: 'A password reset email has been sent to the email address you provided.'};
            }else{
                this.alert = {type: 'danger',message: 'Unfortunately, we were unable to send the password reset email. Please try again later.'};
            }
        })
    }

    public onAlertClose(alert){
        if(alert.type == 'success'){
            this.$scope.closeModal();
        }

        this.alert = undefined;
    }
}