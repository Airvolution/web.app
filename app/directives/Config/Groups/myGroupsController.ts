///<reference path='../../../../typings/tsd.d.ts'/>

export = MyGroupsController;

class MyGroupsController {
    public static name = 'MyGroupsController';
    public groups = [];

    public static $inject = ['$scope', 'APIService','$log', 'notificationService'];
    constructor(
        private $scope,
        private APIService,
        private $log,
        private notificationService
    ) {
        this.refreshGroups();
        let self = this;
        this.notificationService.subscribe(this.$scope, 'GroupModified', () => {
            self.refreshGroups();
        });
    };

    public refreshGroups(){
        this.groups = [];
        var self = this;
        this.APIService.getUserGroups().then((groups)=>{
            self.groups = groups;
        },(error)=>{
            self.$log.error(error);
        });
    }
}
