/// <reference path="../../../typings/tsd.d.ts" />

export = CompareToolboxController;

class CompareToolboxController {
    public expanded;
    public showDetails;
    public clusters;
    public currentStation;
    public stationGroup;
    public stationGroupMap;
    public sortOrder;
    public pollutantOptions;
    public pollutantGroup;
    public weatherOptions;
    public weatherGroup;
    //public count; // TODO: remove! Currently using to witness the woes of ng-repeat & ng-filter
    public static $inject = ['$scope','$state', 'mapFactory', 'selectionService'];
    constructor(
        private $scope,
        private $state,
        private mapFactory,
        private selectionService
    ) {
        let ctc = this;
        ctc.showDetails = false;
        ctc.clusters = [];
        ctc.stationGroup = [];
        ctc.getStationGroupFromSelectionService();
        ctc.getParameters();
        ctc.getPollutantAndWeatherGrouposFromSelectionService();
        ctc.setSortOrderForStations('name');

        $scope.$parent.$watch('ctrl.selectedStation', function () {
            console.log('selectedStation watcher in MapToolboxController triggerd.');
            ctc.currentStation = ctc.selectionService.getCurrentStation();
        });

        //this.count = 0; // TODO: remove! Currently using to witness the woes of ng-repeat & ng-filter
    }

    private getParameters() {
        this.pollutantOptions = this.$scope.$parent.ctrl.pollutantOptions;
        this.weatherOptions = this.$scope.$parent.ctrl.weatherOptions;
    }

    private getStationGroupFromSelectionService() {
        this.currentStation = this.selectionService.getCurrentStation();
        this.stationGroup = this.selectionService.getCurrentStationSelection();
        this.stationGroupMap = this.selectionService.getCurrentStationSelectionMap();
    }

    private getPollutantAndWeatherGrouposFromSelectionService() {
        this.pollutantGroup = this.selectionService.getCurrentPollutantSelection();
        this.weatherGroup = this.selectionService.getCurrentWeatherSelection();
    }

    public removeMarkerFromGroup(marker) {
        console.log('removing marker: ' + marker.id);
        this.selectionService.removeStationFromSelection(marker);
    }

    public addMarkerToGroup(marker) {
        console.log('adding marker: ' + marker.id);
        this.selectionService.addStationToSelection(marker);
    }

    public addPollutantToGroup(pollutant) {
        this.selectionService.addPollutantToSelection(pollutant);
    }

    public addWeatherToGroup(weather) {
        this.selectionService.addWeatherToSelection(weather);
    }

    public isMarkerInGroup(marker) {
        //console.log('isMarkerInGroup: ' + ++this.count);
        return this.stationGroupMap.hasOwnProperty(marker.id);
    }

    public isPollutantInGroup(pollutant) {
        return this.pollutantGroup.hasOwnProperty(pollutant);
    }

    public isWeatherInGroup(weather) {
        return this.pollutantGroup.hasOwnProperty(weather);
    }

    public toggleDetails() {
        this.showDetails = !this.showDetails;
    }

    public toggleExpand() {
        this.expanded = !this.expanded;
    }

    public togglePlot() {
        this.$scope.$parent.togglePlot = !this.$scope.$parent.togglePlot;
    }

    public download() {
        this.$scope.$parent.downloadPlot = !this.$scope.$parent.downloadPlot;
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
        this.$scope.$parent.ctrl.selectedStation = marker;
        this.$scope.$parent.ctrl.center.zoom = 10;
    }
}
