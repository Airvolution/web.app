///<reference path="../../../typings/tsd.d.ts" />

export = PreferencesService;

class PreferencesService {
    public static serviceName = 'preferencesService';
    public static $inject = ['$log'];

    constructor (
        private $log
    ) {

    }
}
