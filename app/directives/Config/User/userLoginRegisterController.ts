/// <reference path="../../../../typings/tsd.d.ts" />

export = UserLoginRegisterController;

class UserLoginRegisterController {
    public loginForm;
    public loginData;
    public registrationForm;
    public registrationData;

    public modelOptions;
    public alert;
    public alertTimeout;

    public static $inject = ['AuthService','$scope'];

    constructor(private AuthService,
                private $scope) {
        $scope.configureModal('Welcome!');

        this.registrationData = {
            email: "",
            password: "",
            confirmPassword: ""
        };

        this.loginData = {
            userName: "",
            password: ""
        };
        this.alert = undefined;
        this.alertTimeout = 2000;
        this.modelOptions = {updateOn: 'default blur', debounce: {default: 250, blur: 0}};
    }

    public savedSuccessfully = false;

    public signUp(){
        var self = this;
        this.AuthService.saveRegistration(this.registrationData).then((response)=> {
                self.alert = {type: 'success', message: 'You have successfully registered', isRegistration: true};
            },
            (response)=> {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                self.alert = {type: 'danger', message: "Failed to register user due to:" + errors.join(' ')};
            });
    };



    public login(){
        var self = this;
        this.AuthService.login(this.loginData).then((response)=> {
                self.alert = {type: 'success', message: "Login successful"};
            },
            (err)=> {
                self.alert = {type: 'danger', message: err.error_description};
            });
    };

    public onAlertClose(alert){
        if(alert.type == 'success'){
            this.alert = undefined;
            if(alert.isRegistration){
                this.loginData.password = this.registrationData.password;
                this.loginData.userName = this.registrationData.email;
                this.login();
            }
            this.$scope.closeModal();
        }else{
            this.alert = undefined;
        }
    }
}
