/// <reference path="../../../../typings/tsd.d.ts" />

export = UserPreferencesController;

class UserPreferencesController {

    public stationQuery;
    public stationQueryResults;
    public searchOptions;

    public parameters = [
        { name: 'PM1.0',       unit: 'UG/M3'  },
        { name: 'PM2.5',       unit: 'UG/M3'  },
        { name: 'PM10',        unit: 'UG/M3'  },
        { name: 'CO',          unit: 'PPM'    },
        { name: 'NO2',         unit: 'PPB'    },
        { name: 'OZONE',       unit: 'PPB'    },
        { name: 'Altitude',    unit: 'M'      },
        { name: 'Humidity',    unit: '%'      },
        { name: 'Temperature', unit: 'C'      },
        { name: 'Pressure',    unit: 'Pascal' }
    ];
    public selectedParameters;
    public preferences;

    public static $inject = ['$scope', '$log', 'SearchService', 'preferencesService'];
    constructor(
        private $scope,
        private $log,
        private SearchService,
        private preferencesService
    ) {
        $scope.submit = this.onSubmit;

        this.searchOptions = { updateOn: 'default blur', debounce: {'default': 250 , 'blur': 0} };
        this.stationQueryResults = [];
        this.selectedParameters = [];
        this.preferences = this.preferencesService.getUserDefaults();
        this.configureSelection();
    }

    public onSubmit = () => {
        let self = this;
        self.preferences.defaultParameters = self.selectedParameters;
        let onError = (error) => { self.$log.log('Failed to update User Preferences: ' + error); };
        self.preferencesService.updateUserDefaults(self.preferences).then((userPreferences) => {
            self.$log.log(('Successfully updated User Preferences: ' + userPreferences));
        }, onError);
    };

    public configureSelection() {
        let self = this;
        this.preferencesService.loadUserDefaults().then( (userPreferences) => {
            angular.forEach(self.parameters, function(parameter) {
                angular.forEach(userPreferences.defaultParameters, function(userParameter) {
                    if (parameter.name == userParameter.name) {
                        self.selectedParameters.push(parameter);
                    }
                });
            });
        });
    }

    public toggleParameterSelection(param) {
        let index = this.selectedParameters.indexOf(param);
        if (index > -1) {
            this.selectedParameters.splice(index, 1);
        } else {
            this.selectedParameters.push(param);
        }
    }

    public searchStations() {
        if(!this.stationQuery || this.stationQuery  == ''){
            this.stationQueryResults = [];
            return;
        }

        this.SearchService.searchStations(this.stationQuery).then((results) => {
            this.stationQueryResults = _.map(results.hits,(result:any) => {
                return result._source;
            });
        });
    }
}
