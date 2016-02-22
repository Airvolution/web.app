/// <reference path="../../../typings/tsd.d.ts" />

export = ToolboxController;

class ToolboxController {
    public expanded;
    public visible;

    public static $inject = ['$scope','$state'];
    constructor(private $scope,
                private $state){
        var self = this;
        $scope.$watch('ctrl.$state.current',(newVal,oldVal)=>{
            if(!self.$state.current){
                return;
            }
            var name = self.$state.current.name;
            if(name == 'almanac' || name.indexOf('config') >= 0){
                self.visible = false;
            } else {
                self.visible = true;
            }
        });
    }

    public toggleExpand(){
        this.expanded = !this.expanded;
    }
}
