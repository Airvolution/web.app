/// <reference path="../../../typings/tsd.d.ts" />

export = UserRegistrationController;

class UserRegistrationController {
    public static name = "UserRegistrationController";
    public message;
    public static $inject = ['AuthService','$uibModalInstance'];

    constructor(private AuthService,
                private $uibModalInstance) {
        this.message = '';
    }

    public savedSuccessfully = false;

    public registration = {
        userName: "",
        password: "",
        confirmPassword: ""
    };

    public signUp = ()=> {
        var self = this;
        this.AuthService.saveRegistration(this.registration).then((response)=> {

                self.savedSuccessfully = true;
                self.message = "You have successfully registered.";
                self.$uibModalInstance.dismiss(self.message);
            },
            (response)=> {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                self.message = "Failed to register user due to:" + errors.join(' ');
                self.$uibModalInstance.dismiss(self.message);
            });
    };

    public loginData = {
        userName: "",
        password: ""
    };

    public login = ()=> {
        var self = this;
        this.AuthService.login(this.loginData).then((response)=> {
                self.message = "You have sucessfully logged in.";
                self.$uibModalInstance.dismiss(self.message);
            },
            (err)=> {
                self.message = err.error_description;
                self.$uibModalInstance.dismiss(self.message);
            });
    };

    public closeModal() {
        this.$uibModalInstance.close();
    }
}
