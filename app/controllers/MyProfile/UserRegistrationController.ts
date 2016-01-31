/// <reference path="../../../typings/tsd.d.ts" />

export = UserRegistrationController;

class UserRegistrationController {
    public static name = "UserRegistrationController";

    public static $inject = ['AuthService', '$timeout', '$location'];

    constructor(private AuthService,
                private $timeout,
                private $location) {
    }

    public savedSuccessfully = false;
    public message = "";

    public registration = {
        userName: "",
        password: "",
        confirmPassword: ""
    };

    public signUp = ()=> {
        var self = this;
        this.AuthService.saveRegistration(this.registration).then((response)=> {

                self.savedSuccessfully = true;
                self.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
            },
            (response)=> {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                self.message = "Failed to register user due to:" + errors.join(' ');
            });
    };

    public loginData = {
        userName: "",
        password: ""
    };

    public login = ()=> {
        var self = this;
        this.AuthService.login(this.loginData).then((response)=> {
                self.$location.path('/orders');
            },
            (err)=> {
                self.message = err.error_description;
            });
    };
}
