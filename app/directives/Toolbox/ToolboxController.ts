/// <reference path="../../../typings/tsd.d.ts" />

export = ToolboxController;

class ToolboxController {
    public expanded;
    public visible;
    public currentMarker;

    public static $inject = ['$scope','$state', 'mapFactory', 'selectionService'];
    constructor(private $scope,
                private $state,
                private mapFactory,
                private selectionService){
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
        this.currentMarker = {};
        this.selectionService.registerCurrentMarker(this.currentMarker);
    }

    public toggleExpand(){
        this.expanded = !this.expanded;
    }

    public toggleMap(mode) {
        this.mapFactory.setMap(mode);
    }

    public getCurrentMarker() {

    }

    public getMarkerNames() {
        return this.mapFactory.getMarkerNames();
    }

    public centerMap() {
        console.log('centerMap called');
    }
}
