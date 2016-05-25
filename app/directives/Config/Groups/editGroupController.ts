/// <reference path="../../../../typings/tsd.d.ts" />

export = EditGroupController;

class EditGroupController {
    public group;
    public groupOriginalMarkers;
    public loading;

    public stationQuery;
    public stationQueryResults;
    public searchOptions;

    public modelOptions;
    public alert;
    public alertTimeout;

    public editGroupForm;
    public formData;

    public static $inject = ['$scope', '$state', '$stateParams', 'APIService', 'SearchService', 'notificationService'];

    public constructor(private $scope,
                       private $state,
                       private $stateParams,
                       private APIService,
                       private SearchService,
                       private notificationService) {
        this.loading = true;
        this.searchOptions = {updateOn: 'default blur', debounce: {'default': 250, 'blur': 0}};
        this.stationQueryResults = [];

        this.alert = undefined;
        this.alertTimeout = 2000;
        this.modelOptions = {updateOn: 'default blur', debounce: {default: 250, blur: 0}};

        let self = this;
        let onError = (error) => {
            self.loading = false;
            console.log('Error loading group in modal: ' + error);
        };

        if ($stateParams.id != 0) {
            this.APIService.getUserGroup($stateParams.id).then((group) => {
                self.group = group;
                self.groupOriginalMarkers = angular.copy(group.stations);
                this.loading = false;
            }, onError);
        } else {
            this.group = {
                id: 0,
                name: '',
                description: '',
                stations: []
            };
            this.groupOriginalMarkers = [];
            this.loading = false;
        }

        var name = $stateParams.id == 0 ? 'Create Group' : 'Edit Group: ' + $stateParams.name;

        $scope.configureModal(name,
            'Save',
            ()=> {
                let markersToAdd = [];
                let markersToRemove = [];

                if(!self.editGroupForm.$valid){
                    self.editGroupForm.$setSubmitted();
                    self.alert = {type: 'danger', message: 'Invalid group, please fill in remaining required data.'};
                    return;
                }
                angular.forEach(self.group.stations, (marker) => {
                    if (!self.originalGroupContainsStation(marker)) {
                        markersToAdd.push(marker.id);
                    }
                });

                angular.forEach(self.groupOriginalMarkers, (marker) => {
                    if (!self.groupContainsStation(marker)) {
                        markersToRemove.push(marker.id);
                    }
                });

                if (self.group.id == 0) {
                    var create = {
                        name: self.formData.name,
                        description: self.formData.description,
                        stationIds: markersToAdd
                    };
                    self.APIService.createGroup(create).then(self.onSuccess, self.onUpdateError);
                } else {
                    self.updateGroup(markersToAdd, markersToRemove);
                }
            },
            'Cancel',
            ()=> {
                $scope.closeModal();
            });

        //TODO Load Adjustment params here
        console.log('Editing group: ' + $stateParams.id);
    }

    private onUpdateError = (error) => {
        this.alert = {type: 'danger', message: 'Sorry. We encountered an error while saving your group.'};
    };

    private onSuccess = (group) => {
        if(!group){
            this.onUpdateError("Could not save group.");
            return;
        }
        this.group = group;
        this.groupOriginalMarkers = angular.copy(group.stations);
        this.notificationService.notify('GroupModified');
        this.alert = {type: 'success', message: 'Changes to your group have been saved.'};
    };

    private updateGroup(markersToAdd, markersToRemove) {
        var self = this;
        this.APIService.updateGroup(this.group, markersToAdd, markersToRemove).then(self.onSuccess, self.onUpdateError);
    }

    public searchStations() {
        if (!this.stationQuery || this.stationQuery == '') {
            this.stationQueryResults = [];
            return;
        }

        var self = this;
        this.SearchService.searchStations(this.stationQuery).then((results)=> {
            self.stationQueryResults = _.map(results.hits, (result:any)=> {
                return result._source;
            });
        });
    }

    public hideSearchResults() {
        this.stationQuery = '';
        this.stationQueryResults = [];
    }

    public removeStation(marker) {
        let index = -1;
        for (let i = 0; i < this.group.stations.length; i++) {
            if (this.group.stations[i].id == marker.id) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            this.group.stations.splice(index, 1);
        }
    }

    public addStation(marker) {
        this.group.stations.push(marker);
    }

    public groupContainsStation(marker) {
        for (let i = 0; i < this.group.stations.length; i++) {
            if (this.group.stations[i].id == marker.id) {
                return true;
            }
        }
        return false;
    }

    public originalGroupContainsStation(marker) {
        for (let i = 0; i < this.groupOriginalMarkers.length; i++) {
            if (this.groupOriginalMarkers[i].id == marker.id) {
                return true;
            }
        }
        return false;
    }

    public onAlertClose(alert) {
        if (alert.type == 'success') {
            this.alert = undefined;
            this.$scope.closeModal();
        } else {
            this.alert = undefined;
        }
    }
}
