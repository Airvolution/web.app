///<reference path='../../../../typings/tsd.d.ts'/>

export = UserInitialsController;

class UserInitialsController{

    public userProfile;
    public initials;
    public static $inject = ['$scope'];

    constructor(private $scope){

        var self = this;
        var unregister = $scope.$watch('ctrl.userProfile', (val)=> {

            if (val){
                if (typeof self.userProfile.firstName == 'undefined'){
                    self.initials = self.userProfile.email[0].toUpperCase();
                }
                else{
                    self.initials = self.userProfile.firstName[0].toUpperCase() + self.userProfile.lastName[0].toUpperCase();
                }
            }

        });

        $scope.$on('$destroy', ()=> {
            unregister();
        });
    }
}