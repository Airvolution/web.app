///<reference path="../../../typings/tsd.d.ts" />

export = PreferencesService;

class PreferencesService {
    public static serviceName = 'preferencesService';

    public defaultMapMode;
    public defaultDownloadFormat;
    public defaultStationId;
    public defaultParameters;

    public static $inject = ['$localStorage', '$log', 'APIService'];
    constructor (
        private $localStorage,
        private $log,
        private APIService
    ) {
        // empty constructor
    }

    public loadUserDefaults() {
        let self = this;
        let onError = (error) => { self.$log('Failed to obtain User Preferences: ' + error); };
        this.APIService.getUserPreferences().then((userPreferences) => {
            self.defaultMapMode = userPreferences['defaultMapMode'];
            self.defaultDownloadFormat = userPreferences['defaultDownloadFormat'];
            self.defaultParameters = userPreferences['defaultParameters'];
            self.defaultStationId = userPreferences['defaultStationId'];
        }, onError);
    }

    public resetUserDefaults() {
        this.defaultMapMode = 'LIGHT';
        this.defaultDownloadFormat = 'CSV';
        this.defaultStationId = null;
        this.defaultParameters = [];
    }
}
