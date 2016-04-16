/// <reference path="../../../typings/tsd.d.ts" />

export = MapToolboxController;

class MapToolboxController {
    public expanded;

    public stationQuery;
    public stationQueryResults;
    public searchOptions;

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

        this.searchOptions = {updateOn: 'default blur', debounce: {'default': 250 , 'blur': 0}};
        this.stationQueryResults = [];
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

    public showPlot() {
        this.configureOptions();
        this.$scope.togglePlot();
        this.selectionService.reset();
    }

    public downloadData() {
        this.configureOptions();
        this.$scope.downloadPlotData();
        this.selectionService.reset();
    }

    public configureOptions() {
        let self = this;
        // sets markers
        angular.forEach(self.markerSelection, (marker) => {
            if (self.isMarkerChecked(marker)) {
                self.selectionService.addStationToSelection(marker);
            }
        });

        // sets parameters
        angular.forEach(self.selectedParameters, (parameter) => {
            if (self.isParameterChecked(parameter)) {
                self.selectionService.addPollutantToSelection(parameter.name);
            }
        });

        // sets time range
        this.selectionService.setDateRange(this.fromDate, this.toDate);
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

    //////////////////////////////////////////////////////
    // OLD CODE SHOWS HOW TO TOGGLE ON AND OFF CLUSTERS //
    //private convertMapLayersToArray(layers) {
    //    let self = this;
    //    angular.forEach(layers, function(value, key) {
    //        self.clusters.push({
    //            id: key,
    //            name: value.name,
    //            visible: value.visible
    //        });
    //    });
    //}
    //
    //public showAllClusters() {
    //    this.$scope.showAllClusters();
    //    angular.forEach(this.clusters, function (cluster) {
    //        cluster['visible'] = true;
    //    });
    //}
    //
    //public hideAllClusters() {
    //    this.$scope.hideAllClusters();
    //    angular.forEach(this.clusters, function (cluster) {
    //        cluster['visible'] = false;
    //    });
    //}
    //////////////////////////////////////////////////////

    public setSelectedStation(marker) {
        this.selectionService.setCurrentStation(marker);
        this.$scope.setSelectedStation(marker);
        this.$scope.resetZoom(10);
        this.$scope.centerOnMarker(marker.location);
    }
}
