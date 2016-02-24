///<reference path="../../../typings/tsd.d.ts" />

export = MapFactory;

class MapFactory {
    public static serviceName = 'mapFactory';
    public static $inject = ['$q', '$log'];
    constructor(
        private $q,
        private $log
    ) {
        // empty constructor
        $log.log('A Map Factory has been born.');
    }

}
