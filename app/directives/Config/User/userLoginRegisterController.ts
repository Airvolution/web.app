/// <reference path="../../../../typings/tsd.d.ts" />

export = UserLoginRegisterController;

class UserLoginRegisterController {
    public message;
    public static $inject = ['AuthService','$scope'];

    constructor(private AuthService,
                private $scope) {
        //$scope.configureModal('Welcome!','Submit',this.login,"Cancel",$scope.closeModal);
        $scope.configureModal('Welcome!');
        $scope.setAlert('');
        $scope.signUp = this.signUp;
        $scope.login = this.login;
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
                self.$scope.closeModal();
            },
            (response)=> {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                self.message = "Failed to register user due to:" + errors.join(' ');
                self.$scope.closeModal();
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
                self.$scope.closeModal();
            },
            (err)=> {
                self.message = err.error_description;
                self.$scope.closeModal();
            });
    };
}
