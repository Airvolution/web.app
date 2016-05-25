/// <reference path="../../../typings/tsd.d.ts" />

export = ToolboxController;

class ToolboxController {
    public expanded;
    public visible;

    public static $inject = ['$scope','$state', 'mapFactory'];
    constructor(private $scope,
                private $state,
                private mapFactory){
        var self = this;
        $scope.$watch('ctrl.$state.current',(newVal,oldVal)=>{
            if(!self.$state.current){
                return;
            }
            var name = self.$state.current.name;
            if(name.indexOf('map') >=0 || name.indexOf('compare') >= 0){
                self.visible = true;
            } else {
                self.visible = false;
            }
        });
    }

    public toggleExpand(){
        this.expanded = !this.expanded;
    }

    public toggleMap(mode) {
        this.mapFactory.setMap(mode);
    }

    public getMarkerNames() {
        return this.mapFactory.getMarkerNames();
    }

    public centerMap() {
    }
}
