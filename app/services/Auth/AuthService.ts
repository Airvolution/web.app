/// <reference path='../../../typings/tsd.d.ts' />

export = AuthService;

class AuthService {
    public static serviceName = 'AuthService';

    public authentication = {
        isAuth: false,
        userName: '',
        firstName: '',
        lastName: '',

    };

    public static $inject = ['$http', '$q', '$localStorage', '$rootScope', 'notificationService'];
    constructor(private $http,
                private $q,
                private $localStorage,
                private $rootScope,
                private notificationService) {
    }

    public saveRegistration = function (registration) {
        this.logOut();

        return this.$http.post('api/users/register', registration).then(function (response) {
            return response;
        });

    };

    public login = function (loginData) {
        var data = 'grant_type=password&username=' + loginData.userName + '&password=' + loginData.password;
        var deferred = this.$q.defer();

        var self = this;
        this.$http.post('/api/users/login', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function (response) {
            self.$localStorage.authorizationData = {token: response.access_token, userName: loginData.userName};
            self.authentication.isAuth = true;
            self.authentication.userName = loginData.userName;
            self.notificationService.notify('UserLogin');
            deferred.resolve(response);
        }).error(function (err, status) {
            self.logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    public logOut = function () {
        delete this.$localStorage.authorizationData;
        this.authentication.isAuth = false;
        this.authentication.userName = '';
        this.notificationService.notify('UserLogout');
    };

    public fillAuthData = function () {
        var authData = this.$localStorage.authorizationData;
        if (authData) {
            var self = this;
            this.authentication.isAuth = true;
            this.authentication.userName = authData.userName;
            this.$http.get('api/users/authtest').then((response)=>{
                if(response.status != 200){
                    self.logout();
                } else {
                    self.notificationService.notify('UserLogin');
                }
            }).catch((error)=>{
                self.logOut();
            });
        }
    };
}

