/// <reference path="../../../typings/tsd.d.ts" />

export = MapToolboxController;

class MapToolboxController {
    public stationQuery;
    public stationQueryResults;

    public selectedParameters;

    public searchOptions;

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



    public static $inject = ['$scope','$state', 'mapFactory', 'selectionService','SearchService'];
    constructor(
        private $scope,
        private $state,
        private mapFactory,
        private selectionService,
        private SearchService
    ) {

        this.searchOptions = {updateOn: 'default blur', debounce: {'default': 250 , 'blur': 0}};
        this.stationQueryResults = [];
        this.selectedParameters = [];

        let mtc = this;
        mtc.showDetails = false;
        mtc.clusters = [];
        mtc.stationGroup = [];
        mtc.convertMapLayersToArray(mapFactory.createMapLayers().overlays);
        mtc.getStationGroupFromSelectionService();
        mtc.setSortOrderForStations('name');
        mtc.initPollutantOptions();

        $scope.$parent.$watch('ctrl.selectedStation', function () {
            mtc.currentStation = mtc.selectionService.getCurrentStation();
        });


    }

    public searchStations() {
        if(!this.stationQuery || this.stationQuery  == ''){
            this.stationQueryResults = [];
            return;
        }

        var self = this;
        this.SearchService.searchStations(this.stationQuery).then((results)=>{
            this.stationQueryResults = _.map(results.hits,(result:any)=>{
                return result._source;
            });
        });
    }

    private getStationGroupFromSelectionService() {
        this.currentStation = this.selectionService.getCurrentStation();
        this.stationGroup = this.selectionService.getCurrentStationSelection();
        this.stationGroupMap = this.selectionService.getCurrentStationSelectionMap();
    }

    public removeMarkerFromGroup(marker) {
        this.selectionService.removeStationFromSelection(marker);
        this.selectionService.setCurrentStation(marker);
        this.$scope.$parent.ctrl.selectedStation = marker;
    }

    public addMarkerToGroup(marker) {
        this.selectionService.addStationToSelection(marker);
        this.selectionService.setCurrentStation(marker);
        this.$scope.$parent.ctrl.selectedStation = marker;
    }

    public isMarkerInGroup(marker) {
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

    private initPollutantOptions() {
        let self = this;
        self.pollutantOptionsMap = self.getPollutantOptionsMap();

        let selection = self.selectionService.getCurrentPollutantSelection();
        let options = self.getPollutantOptions();
        angular.forEach(selection, function(value) {
            let key = self.pollutantOptionsMap[value];
            options[key].selected = true;
        });
        self.pollutantOptions = options;
    }

    private getPollutantOptions() {
        return [
            {
                kind: 'PM2.5',
                name: 'Particulate Matter 2.5',
                selected: false
            },
            {
                kind: 'PM10',
                name: 'Particulate Matter 10',
                selected: false
            },
            {
                kind: 'CO',
                name: 'Carbon Monoxide',
                selected: false
            },
            {
                kind: 'CO2',
                name: 'Carbon Dioxide',
                selected: false
            },
            {
                kind: 'NO2',
                name: 'Nitrogen Dioxide',
                selected: false
            },
            {
                kind: 'OZONE',
                name: 'Ozone',
                selected: false
            },
        ];
    }

    private getPollutantOptionsMap() {
        return {
            'PM2.5': 0,
            'PM10': 1,
            'CO': 2,
            'CO2': 3,
            'NO2': 4,
            'OZONE': 5
        };
    }
}