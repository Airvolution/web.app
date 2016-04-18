/// <reference path="../../../../typings/tsd.d.ts" />

export = EditGroupController;

class EditGroupController {
    public group;
    public groupOriginalMarkers;
    public loading;

    public stationQuery;
    public stationQueryResults;
    public searchOptions;

    public static $inject = ['$scope', '$state','$stateParams','APIService', 'SearchService'];
    public constructor(
        private $scope,
        private $state,
        private $stateParams,
        private APIService,
        private SearchService
    ) {
        this.loading = true;
        this.searchOptions = {updateOn: 'default blur', debounce: {'default': 250 , 'blur': 0}};
        this.stationQueryResults = [];

        let self = this;
        let onError = (error) => {
            self.loading = false;
            console.log('Error loading group in modal: ' + error);
        };
        this.APIService.getUserGroup($stateParams.id).then((group) => {
            self.group = group;
            self.groupOriginalMarkers = angular.copy(group.stations);
            this.loading = false;
        }, onError);


        $scope.configureModal('Edit Group: ' + $stateParams.name,
            'Save',
            ()=> {
                console.log('EditGroupController: formSubmit() called.');
                $scope.closeModal();
            },
            'Cancel',
            ()=> {
                console.log('EditGroupController: formCancel() called.');
                $scope.closeModal();
            });

        //TODO Load Adjustment params here
        console.log('Editing group: ' + $stateParams.id);
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
}
