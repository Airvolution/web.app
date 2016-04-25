///<reference path='../../../../typings/tsd.d.ts'/>

export = UserInitialsController;

class UserInitialsController{

    public userProfile;
    public initials;
    public emailHash;
    public static $inject = ['$scope','md5','AuthService','notificationService'];

    constructor(private $scope, private md5, private AuthService, notificationService){

        notificationService.subscribe($scope,'UserLogin',()=>{
            self.fillEmailHash();
        });
        notificationService.subscribe($scope,'UserLogout',()=>{
            self.emailHash = '';
        });
        this.fillEmailHash();

        var self = this;
        var unregister = $scope.$watch('ctrl.userProfile', (val)=> {
            if (val){
                if (!val.firstName && !val.lastName){
                    self.initials = val.email ? val.email[0].toUpperCase(): '';
                } else {
                    self.initials = (val.firstName[0].toUpperCase()||'') + (val.lastName[0].toUpperCase()||'');

                }
            }

        });

        $scope.$on('$destroy', ()=> {
            unregister();
        });
    }

    private fillEmailHash(){
        if(this.AuthService.authentication.isAuth){
            var email = this.AuthService.authentication.userName;
            email = email.trim();
            email = email.toLowerCase();
            this.emailHash = this.md5.createHash( email || '')
        }
    }
}
