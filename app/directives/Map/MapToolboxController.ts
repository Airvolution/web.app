/// <reference path="../../../typings/tsd.d.ts" />

export = MapToolboxController;

class MapToolboxController {
    public expanded;
    public showDetails;
    public clusters;
    public currentStation;
    public stationGroup;
    public stationGroupMap;
    public sortOrder;
    public pollutantOptions;
    public pollutantOptionsMap;
    public weatherOptions;
    //public count; // TODO: remove! Currently using to witness the woes of ng-repeat & ng-filter
    public static $inject = ['$scope','$state', 'mapFactory', 'selectionService'];
    constructor(
        private $scope,
        private $state,
        private mapFactory,
        private selectionService
    ) {
        let mtc = this;
        mtc.showDetails = false;
        mtc.clusters = [];
        mtc.stationGroup = [];
        mtc.convertMapLayersToArray(mapFactory.createMapLayers().overlays);
        mtc.getStationGroupFromSelectionService();
        mtc.setSortOrderForStations('name');
        mtc.getPollutantOptions();

        $scope.$parent.$watch('ctrl.selectedStation', function () {
            console.log('selectedStation watcher in MapToolboxController triggered.');
            mtc.currentStation = mtc.selectionService.getCurrentStation();
        });

        //this.count = 0; // TODO: remove! Currently using to witness the woes of ng-repeat & ng-filter
    }

    private getStationGroupFromSelectionService() {
        this.currentStation = this.selectionService.getCurrentStation();
        this.stationGroup = this.selectionService.getCurrentStationSelection();
        this.stationGroupMap = this.selectionService.getCurrentStationSelectionMap();
    }

    public removeMarkerFromGroup(marker) {
        console.log('removing marker: ' + marker.id);
        this.selectionService.removeStationFromSelection(marker);
    }

    public addMarkerToGroup(marker) {
        console.log('adding marker: ' + marker.id);
        this.selectionService.addStationToSelection(marker);
    }

    public isMarkerInGroup(marker) {
        //console.log('isMarkerInGroup: ' + ++this.count);
        return this.stationGroupMap.hasOwnProperty(marker.id);
    }

    private convertMapLayersToArray(layers) {
        let self = this;
        angular.forEach(layers, function(value, key) {
            self.clusters.push({
                id: key,
                name: value.name,
                visible: value.visible
            });
        });
    }

    public toggleDetails() {
        this.showDetails = !this.showDetails;
    }

    public togglePreviewDetails() {
        this.$scope.$parent.toggleDetails = !this.$scope.$parent.toggleDetails;
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

    public toggleCluster(cluster) {
        console.log('cluster: ' + cluster);
        this.$scope.$parent.toggleCluster = cluster.id;
    }

    public showAllClusters() {
        this.$scope.$parent.showAllClusters = !this.$scope.$parent.showAllClusters;
        angular.forEach(this.clusters, function (cluster) {
            cluster['visible'] = true;
        });
    }

    public hideAllClusters() {
        this.$scope.$parent.hideAllClusters = !this.$scope.$parent.hideAllClusters;
        angular.forEach(this.clusters, function (cluster) {
            cluster['visible'] = false;
        });
    }

    public setSortOrderForStations(order) {
        switch (order) {
            case 'name':
                this.sortOrder = '-name';
                break;
            case 'agency':
                this.sortOrder = '-agency';
                break;
            case 'id':
                this.sortOrder = '-id';
                break;
            case 'city':
                this.sortOrder = '-city';
                break;
            case 'state':
                this.sortOrder = '-state';
                break;
            case 'postal':
                this.sortOrder = '-postal';
                break;
            default:
                this.sortOrder = '-name';
        };
    }

    public setSelectedStation(marker) {
        this.selectionService.setCurrentStation(marker);
        this.$scope.$parent.ctrl.selectedStation = marker;
        this.$scope.$parent.ctrl.center.zoom = 10;
        this.centerMapOnSelectedMarker();
    }

    public zoomMapOut() {
        this.$scope.$parent.ctrl.center.zoom = 5;
    }

    public togglePollutantOption(pollutant) {
        pollutant.selected = !pollutant.selected;
        this.selectionService.updatePollutantSelectionWith(pollutant.kind);
    }

    private getPollutantOptions() {
        this.pollutantOptions = this.selectionService.getCurrentPollutantSelection();
        //let self = this;
        //self.pollutantOptionsMap = self.getPollutantOptionsMap();
        //
        //let selection = self.selectionService.getCurrentPollutantSelection();
        //let options = self.getPollutantOptions();
        //angular.forEach(selection, function(value) {
        //    console.log('==================================');
        //    console.log('value: ' + value);
        //    let key = self.pollutantOptionsMap[value];
        //    options[key].selected = true;
        //});
        //self.pollutantOptions = options;
    }

}
