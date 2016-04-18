/// <reference path="../../../../typings/tsd.d.ts" />

export = GroupController;

class GroupController {
    public group;
    public refresh:()=>void;
    public static $inject = ['APIService'];
    public constructor(private APIService){}

    public deleteGroup(){
        var self = this;
        this.APIService.deleteGroup(this.group).then((succeeded)=>{
            if(succeeded){
                self.group = undefined;
                self.refresh();
            }
        });

    }
}