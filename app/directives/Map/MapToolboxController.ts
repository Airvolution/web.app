/// <reference path="../../../typings/tsd.d.ts" />

export = MapToolboxController;

class MapToolboxController {
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

    public toggleMap(mode) {
        this.mapFactory.setMap(mode);
    }

    public getMarkerNames() {
        return this.mapFactory.getMarkerNames();
    }

    public centerMap() {
        console.log('centerMap called');
    }
}
