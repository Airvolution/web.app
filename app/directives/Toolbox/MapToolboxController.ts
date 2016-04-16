/// <reference path="../../../typings/tsd.d.ts" />

export = MapToolboxController;

class MapToolboxController {
    public stationQuery;
    public stationQueryResults;
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

    // new variables ^^^ some of previous variables are buggy
    public markerSelection;
    public markerSelectionIds;
    public markerUncheckedIds;
    public availableParameters;
    public selectedParameters;
    public fromDate;
    public toDate;

    // variables for user defaults
    public userDefaultStation;
    public userDefaultParameters;

    public static $inject = ['$scope','$state', '$log', 'mapFactory', 'selectionService','SearchService', 'AQIColors', 'preferencesService', 'notificationService'];
    constructor(
        private $scope,
        private $state,
        private $log,
        private mapFactory,
        private selectionService,
        private SearchService,
        private AQIColors,
        private preferencesService,
        private notificationService
    ) {
        this.markerSelection = [];    // array of all markers in selection group
        this.markerSelectionIds = {}; // maps marker.id to index in marker array
        this.markerUncheckedIds = {}; // maps marker.id to index in marker array, contains unchecked markers which must still be displayed
        this.availableParameters = this.AQIColors.getParameterList();
        this.selectedParameters = [];
        //this.loadUserDefaults(); // <-- TODO: see comment in method declaration!
        this.toDate = new Date();
        this.fromDate = new Date();
        this.fromDate.setDate(this.fromDate.getDate() - 7);


        //var today = new Date();
        //this.then = new Date().setDate(today.getDate() - 45);


        this.searchOptions = {updateOn: 'default blur', debounce: {'default': 250 , 'blur': 0}};
        this.stationQueryResults = [];

        let mtc = this;
        mtc.clusters = [];
        mtc.stationGroup = [];
        mtc.convertMapLayersToArray(mapFactory.createMapLayers().overlays);
        mtc.getStationGroupFromSelectionService();
        mtc.setSortOrderForStations('name');
        mtc.initPollutantOptions();

        var deregister = $scope.$parent.$watch('selectedStation', function (val) {
            mtc.currentStation = val;
        });

        $scope.$on("$destroy",()=>{deregister();});

    }

    public searchStations() {
        if(!this.stationQuery || this.stationQuery  == ''){
            this.stationQueryResults = [];
            return;
        }

        var self = this;
        this.SearchService.searchStations(this.stationQuery).then((results)=>{
            self.stationQueryResults = _.map(results.hits,(result:any)=>{
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
        this.$scope.setSelectedStation(marker);
    }

    public addMarkerToGroup(marker) {
        this.selectionService.addStationToSelection(marker);
        this.selectionService.setCurrentStation(marker);
        this.$scope.setSelectedStation(marker);
    }

    public isMarkerInGroup(marker) {
        return this.markerSelectionIds[marker.id] != undefined;
    }

    public isMarkerChecked(marker) {
        return this.markerUncheckedIds[marker.id] == undefined;
    }

    public isParameterChecked(parameter) {
        return this.selectedParameters.indexOf(parameter) > -1;
    }

    public toggleMarker(marker) {
        let index = this.markerSelectionIds[marker.id];
        if (index != undefined) {
            // Removes marker from Selection Group
            this.markerSelection.splice(index, 1);
            delete this.markerSelectionIds[marker.id];
            delete this.markerUncheckedIds[marker.id];
        } else {
            // Adds marker to Selection Group
            this.markerSelectionIds[marker.id] = this.markerSelection.length;
            this.markerSelection.push(marker);
        }
    }

    public toggleChecked(marker) {
        let index = this.markerUncheckedIds[marker.id];
        if (index != undefined) {
            // Re-Checks the marker in the Selection Group
            delete this.markerUncheckedIds[marker.id];
        } else {
            // Un-Checks the marker in the Selection Group
            this.markerUncheckedIds[marker.id] = this.markerSelectionIds[marker.id];
        }
    }

    public toggleParameter(parameter) {
        let index = this.selectedParameters.indexOf(parameter);
        if (index > -1) {
            this.selectedParameters.splice(index, 1);
        } else {
            this.selectedParameters.push(parameter);
        }
    }

    public configurePlot() {
        let self = this;
        angular.forEach(self.markerSelection, (marker) => {
            if (self.isMarkerChecked(marker)) {
                self.selectionService.addStationToSelection(marker);
            }
        });

        angular.forEach(self.selectedParameters, (parameter) => {
            if (self.isParameterChecked(parameter)) {
                self.selectionService.addPollutantToSelection(parameter.name);
            }
        });

        self.$scope.togglePlot();
        self.selectionService.reset();
    }

    public loadUserDefaults() {
        // TODO: BUG!!! if this is called before the map loads, the map will never load tiles !??!
        let self = this;
        this.preferencesService.loadUserDefaults().then((userPreferences) => {
            // TODO: do something with the station id
            self.userDefaultStation = userPreferences.defaultStationId;
            self.userDefaultParameters = userPreferences.defaultParameters;

            angular.forEach(self.userDefaultParameters, (userParameter) => {
                angular.forEach(self.availableParameters, (parameter) => {
                    if (parameter.name == userParameter.name) {
                        self.selectedParameters.push(parameter);
                    }
                });
            });
            self.$log.log('received userPreferences: ' + userPreferences);
        }, (error) => {
            self.$log.log('received error: ' + error);
        });
    }

    public clearSelectionGroup() {
        this.markerSelection = [];    // array of all markers in selection group
        this.markerSelectionIds = {}; // maps marker.id to index in marker array
        this.markerUncheckedIds = {}; // maps marker.id to index in marker array, contains unchecked markers which must still be displayed
    }

    public saveSelectionGroup() {
        // TODO: implement this functionality
        this.$log.log('MapToolboxController: saveSelectionGroup() called. TODO: Implement this functionality.');
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


    public getMarkerNames() {
        return this.mapFactory.getMarkerNames();
    }


    public showAllClusters() {
        this.$scope.showAllClusters();
        angular.forEach(this.clusters, function (cluster) {
            cluster['visible'] = true;
        });
    }

    public hideAllClusters() {
        this.$scope.hideAllClusters();
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
        this.$scope.setSelectedStation(marker);
        this.$scope.resetZoom(10);
        this.$scope.centerOnMarker(marker.location);
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
