///<reference path="../../../typings/tsd.d.ts" />

export = PreferencesService;

class PreferencesService {
    public static serviceName = 'preferencesService';

    private defaultPreferences;
    private userPreferences;

    public static $inject = ['$scope', '$q', '$log', 'APIService'];

    constructor(private $scope,
                private $q,
                private $log,
                private APIService
    ) {
        this.defaultPreferences = {
            defaultMapMode: 'LIGHT',
            defaultDownloadFormat: 'CSV',
            defaultStationId: null,
            defaultParameters: []
        };

        var unregisterLogin  = $scope.$on('UserLogin',  this.loadUserDefaults);
        var unregisterLogout = $scope.$on('UserLogout', this.resetUserDefaults);
        $scope.$on('$destroy',() => {
            unregisterLogin();
            unregisterLogout();
        });
    }

    public loadUserDefaults() {
        var deferred = this.$q.defer();
        let self = this;
        let onError = (error) => {
            deferred.reject('Failed to obtain User Preferences: ' + error);
        };
        return this.APIService.getUserPreferences().then((userPreferences) => {
            self.userPreferences = userPreferences;
            return userPreferences;
        }, onError);
    }

    public resetUserDefaults() {
        this.userPreferences = angular.copy(this.defaultPreferences)
    }

    public updateUserDefaults(preferences) {
        var deferred = this.$q.defer();
        let self = this;
        let onError = (error) => {
            deferred.reject(error);
        };
        return self.APIService.updateUserPreferences(preferences).then((userPreferences) => {
            self.userPreferences = userPreferences;
        }, onError);
    }

    public getUserDefaults() {
        return angular.copy(this.userPreferences);
    }
}
