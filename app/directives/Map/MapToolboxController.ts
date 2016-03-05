/// <reference path="../../../typings/tsd.d.ts" />

export = MapToolboxController;

class MapToolboxController {
    public expanded;
    public showDetails;
    public static $inject = ['$scope','$state', 'mapFactory'];
    constructor(
        private $scope,
        private $state,
        private mapFactory
    ) {
        this.showDetails = false;
    }

    public toggleDetails() {
        this.showDetails = !this.showDetails;
    }

    public toggleExpand() {
        this.expanded = !this.expanded;
    }

    public toggleMap(mode) {
        this.$scope.$parent.mode = mode;
    }

    public getMarkerNames() {
        return this.mapFactory.getMarkerNames();
    }

    public centerMapOnLocation() {
        this.$scope.$parent.centerOnLocation = !this.$scope.$parent.centerOnLocation;
    }

    public togglePlot() {
        this.$scope.$parent.togglePlot = !this.$scope.$parent.togglePlot;
    }

    public download() {
        this.$scope.$parent.downloadPlot = !this.$scope.$parent.downloadPlot;
    }

    public centerMapOnSelectedMarker() {
        this.$scope.$parent.centerOnMarker = !this.$scope.$parent.centerOnMarker;
    }
}
