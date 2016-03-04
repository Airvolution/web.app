/// <reference path="../../../typings/tsd.d.ts" />

export = MapToolboxController;

class MapToolboxController {
    public expanded;

    public static $inject = ['$scope','$state', 'mapFactory'];
    constructor(
        private $scope,
        private $state,
        private mapFactory) {

    }

    public toggleExpand(){
        this.expanded = !this.expanded;
    }

    public toggleMap(mode) {
        //this.mapFactory.setMap(mode);
        this.$scope.$parent.mode = mode;
    }

    public getMarkerNames() {
        return this.mapFactory.getMarkerNames();
    }

    public centerMapOnLocation() {
        console.log('centerMapOnLocation called');
        this.$scope.$parent.centerOnLocation = !this.$scope.$parent.centerOnLocation;
    }

    public centerMapOnSelectedMarker() {
        console.log('centerMapOnSelectedMarker called');
        this.$scope.$parent.centerOnMarker = !this.$scope.$parent.centerOnMarker;
    }
}
