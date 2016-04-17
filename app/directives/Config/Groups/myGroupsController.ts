///<reference path='../../../../typings/tsd.d.ts'/>

export = MyGroupsController;

class MyGroupsController {
    public static name = 'MyGroupsController';
    public groups = [];

    public static $inject = [ 'APIService','$log'];
    constructor(private APIService, private $log) {
        this.refreshGroups();
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
