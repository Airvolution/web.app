///<reference path="../../../typings/tsd.d.ts" />

export = PreferencesService;

class PreferencesService {
    public static serviceName = 'preferencesService';

    private defaultPreferences;
    private userPreferences;

    public static $inject = ['$q', '$log', 'APIService', 'notificationService'];

    constructor(private $q,
                private $log,
                private APIService,
                private notificationService
    ) {
        this.defaultPreferences = {
            defaultMapMode: 'LIGHT',
            defaultDownloadFormat: 'CSV',
            defaultStationId: null,
            defaultParameters: []
        };

        this.notificationService.subscribe(undefined, 'UserLogin', this.loadUserDefaults);
        this.notificationService.subscribe(undefined, 'UserLogout', this.resetUserDefaults);
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
        this.userPreferences = angular.copy(this.defaultPreferences);
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
