///<reference path="../../../typings/tsd.d.ts" />

export = PreferencesService;

class PreferencesService {
    public static serviceName = 'preferencesService';

    private defaultMapMode;
    private defaultDownloadFormat;
    private defaultStationId;
    private defaultParameters;

    public static $inject = ['$q', '$localStorage', '$log', 'APIService'];
    constructor (
        private $q,
        private $localStorage,
        private $log,
        private APIService
    ) {

    }

    public loadUserDefaults() {
        var deferred = this.$q.defer();
        let self = this;
        let onError = (error) => { deferred.reject('Failed to obtain User Preferences: ' + error); };
        return this.APIService.getUserPreferences().then((userPreferences) => {
            self.defaultMapMode = userPreferences['defaultMapMode'];
            self.defaultDownloadFormat = userPreferences['defaultDownloadFormat'];
            self.defaultParameters = userPreferences['defaultParameters'];
            self.defaultStationId = userPreferences['defaultStationId'];
            return self.getUserDefaults();
        }, onError);
    }

    public resetUserDefaults() {
        this.defaultMapMode = 'LIGHT';
        this.defaultDownloadFormat = 'CSV';
        this.defaultStationId = null;
        this.defaultParameters = [];
    }

    public updateUserDefaults(preferences) {
        var deferred = this.$q.defer();
        let self = this;
        let onError = (error) => { deferred.reject(error); };
        return self.APIService.updateUserPreferences(preferences).then((userPreferences) => {
            self.defaultMapMode = userPreferences['defaultMapMode'];
            self.defaultDownloadFormat = userPreferences['defaultDownloadFormat'];
            self.defaultParameters = userPreferences['defaultParameters'];
            self.defaultStationId = userPreferences['defaultStationId'];
            return self.getUserDefaults();
        }, onError);
    }

    public getUserDefaults() {
        let preferences = {
            defaultMapMode: this.defaultMapMode,
            defaultDownloadFormat: this.defaultDownloadFormat,
            defaultParameters: this.defaultParameters,
            defaultStationId: this.defaultStationId
        };

        let copy = angular.copy(preferences);
        return copy;
    }
}
