/// <reference path="../../../typings/tsd.d.ts" />

export = MapToolboxController;

class MapToolboxController {
    public expanded;
    public query;
    public showPlotDrawer;
    public showStationDrawer;
    public stationQueryResults;
    public groupQueryResults;
    public searchOptions;
    public showSearchResults;

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

    public userStations;
    public userGroups;
    public userGroupsMap;
    public selectedGroup;
    public markersInSelectedGroup;

    public showUserGroups;
    public newGroupName;
    public newGroupDesc;
    public userAddingNewGroup;

    public static $inject = ['$scope','$state', '$log', 'mapFactory', 'selectionService','SearchService', 'AQIColors', 'preferencesService', 'notificationService', 'APIService'];
    constructor(
        private $scope,
        private $state,
        private $log,
        private mapFactory,
        private selectionService,
        private SearchService,
        private AQIColors,
        private preferencesService,
        private notificationService,
        private APIService
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

        this.showPlotDrawer = false;
        this.showStationDrawer = false;

        this.searchOptions = {updateOn: 'default blur', debounce: {'default': 250, 'blur': 0}};
        this.stationQueryResults = [];
        this.groupQueryResults = [];
        this.userStations = [];
        this.userGroups = [];
        this.userGroupsMap = {};
        this.selectedGroup = {};
        this.markersInSelectedGroup = [];

        this.showUserGroups = false;
        this.newGroupName = '';
        this.newGroupDesc = '';
        this.userAddingNewGroup = false;

        let self = this;

        // try to load user stations and groups first
        let loadUserMarkers = (markers) => {
            self.userStations = markers;
            for (let i = 0; i < self.userStations.length; i++) {
                self.markerSelection.push(self.userStations[i]);
                self.markerSelectionIds[self.userStations[i].id] = i
            }
        };

        let loadUserGroups = (groups) => {
            self.userGroups = groups;
            self.userGroupsMap = {};
            angular.forEach(groups, (group) => {
                angular.forEach(group.stations, (station) => {
                    self.userGroupsMap[station.id] = group.id;
                });
            });
        };

        let waitForUserMarkers = () => {
            self.notificationService.subscribe(undefined, 'UserLogin', () => {
                self.APIService.getUserStations().then(loadUserMarkers);
            });
        };

        let waitForUserGroups = () => {
            self.notificationService.subscribe(undefined, 'UserLogin', () => {
                self.APIService.getUserGroups().then(loadUserGroups);
            });
        };

        this.notificationService.subscribe(this.$scope, 'GroupModified', () => {
            self.APIService.getUserGroups().then((groups) => {
                loadUserGroups(groups);
                self.hideStationsInGroup();
                self.mapFactory.showAllClusters();
            }, waitForUserGroups);
        });

        this.APIService.getUserStations().then(loadUserMarkers, waitForUserMarkers);
        this.APIService.getUserGroups().then(loadUserGroups, waitForUserGroups);
    }

    public search() {
        this.resetSearchResults();
        if (!this.query) {
            this.closeSearchResults();
            return;
        }
        this.showSearchResults = true;
        var self = this;
        this.SearchService.searchStations(this.query).then((results)=> {
            self.stationQueryResults = _.map(results.hits, (result:any)=> {
                return result._source;
            });
        });
        this.SearchService.searchGroups(this.query).then((results)=> {
            self.groupQueryResults = _.map(results.hits, (result:any)=> {
                return result._source;
            });
        });
    }

    public closeSearchResults() {
        this.query = '';
        this.showSearchResults = false;
        this.resetSearchResults();
    }

    public resetSearchResults() {
        this.stationQueryResults = [];
        this.groupQueryResults = [];
    }

    public isMarkerInGroup(marker) {
        var result;
        if (!marker.id) {
            result = this.markerSelectionIds[marker];
        } else {
            result = this.markerSelectionIds[marker.id];
        }
        return result !== undefined;
    }

    public markersInGroup(group) {
        if (!group || !group.stations || !group.stations.length) {
            return false;
        }
        for (var i = 0; i < group.stations.length; i++) {
            if (!this.isMarkerInGroup(group.stations[i])) {
                return false;
            }
        }
        return true;
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
            this.removeMarker(marker);
        } else {
            this.addMarker(marker);
        }
    }

    public addMarker(marker) {
        // TODO: This implementation breaks when removing groups from selection
        // TODO: Use the CLEAR button for now
        if (this.markerSelectionIds[marker.id]) {
            return;
        }
        this.markerSelectionIds[marker.id] = this.markerSelection.length;
        this.markerSelection.push(marker);
    }

    public removeMarker(marker) {
        // TODO: This implementation breaks when removing group from selection
        // TODO: Use the CLEAR button for now
        var id = marker.id ? marker.id : marker;
        let index = this.markerSelectionIds[id];
        if (index === undefined) {
            return;
        }
        this.markerSelection.splice(index, 1);
        delete this.markerSelectionIds[id];
        delete this.markerUncheckedIds[id];
    }

    public toggleGroup(group) {
        if (!this.markersInGroup(group)) {

            // group may have stationsIds or stationObjects
            let stationIds = [];
            let stationObjectCount = 0;
            angular.forEach(group.stations, (station) => {
                if (!station.id) {
                    stationIds.push(station);
                } else {
                    stationIds.push(station.id);
                    stationObjectCount++;
                }
            });

            // if we have all the station objects already, do nothin
            var self = this;
            if (stationObjectCount == group.stations.length) {
                angular.forEach(group.stations, (station) => {
                    self.addMarker(station);
                });
            } else {
                this.APIService.getMultipleStations(stationIds).then((stations)=> {
                    _.map(stations, (station)=> {
                        self.addMarker(station);
                    });
                });
            }
        } else {
            for (var i = 0; i < group.stations.length; i++) {
                this.removeMarker(group.stations[i]);
            }
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
        this.showPlotDrawer = false;
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

    public listStationsInGroup(group) {
        if (this.selectedGroup['id'] != undefined) {
            this.hideStationsInGroup();
        }

        let self = this;
        this.selectedGroup = group;
        this.markersInSelectedGroup = [];
        angular.forEach(self.mapFactory.mapMarkers, (marker) => {
            if (self.userGroupsMap[marker.id] == group.id) {
                self.markersInSelectedGroup.push(marker);
            }
        });
        this.$scope.hideAllClusters();
        this.mapFactory.createUserGroupLayer(this.markersInSelectedGroup);
        this.$scope.showUserClusters();
    }

    public hideStationsInGroup() {
        this.$scope.hideAllClusters();
        this.mapFactory.removeUserGroupLayer(this.markersInSelectedGroup);
        this.selectedGroup = {};
        this.markersInSelectedGroup = [];
        this.$scope.showAllClusters();
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

    public editGroup(group) {
        this.$state.go('modal.editGroup', { id: group.id, name: group.name } );
    }

    public addNewGroup() {
        this.userAddingNewGroup = true;
    }

    public cancelNewGroup() {
        this.userAddingNewGroup = false;
        this.newGroupName = '';
        this.newGroupDesc = '';
    }

    public createNewGroup() {
        let group = {
            name: this.newGroupName,
            description: this.newGroupDesc,
            stationIds: []
        };

        let self = this;
        this.APIService.createGroup(group).then((newGroup) => {
            self.userGroups.push(newGroup);
            angular.forEach(newGroup.stations, (station) => {
                self.userGroupsMap[station.id] = newGroup.id;
            });
            self.cancelNewGroup();
        });
    }

    public setSelectedStation(marker) {
        this.selectionService.setCurrentStation(marker);
        this.$scope.setSelectedStation(marker);
        this.$scope.resetZoom(10);
        this.$scope.centerOnMarker(marker.location);
    }

    public closeAllDrawers() {
        this.showPlotDrawer = false;
        this.showStationDrawer = false;
    }

    public toggleStationDrawer() {
        if (this.showStationDrawer) {
            this.closeAllDrawers();
        } else {
            this.closeAllDrawers();
            this.showStationDrawer = true;
        }
        this.$scope.toggleSiteSearch(!this.showStationDrawer);
    }

    public togglePlotDrawer() {
        if (this.showPlotDrawer) {
            this.closeAllDrawers();
        } else {
            this.closeAllDrawers();
            this.showPlotDrawer = true;
        }
        this.$scope.toggleSiteSearch(!this.showPlotDrawer);
    }
}
