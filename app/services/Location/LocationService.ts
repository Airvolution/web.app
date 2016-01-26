///<reference path="../../../typings/tsd.d.ts" />

export = LocationService;

class LocationService {
    public static serviceName = 'locationService';
    public static $inject = ['$http'];
    private data = undefined;
    constructor(
        private $http
    ) {
        this.findLocation(function() {
            //console.log('initialization of location service');
        });
    }

    public city = function() {
        //console.log('city called!');
        this.findLocation(function() {
            //console.log('city: ' + this.data.city);
            return this.data.city;
        });
    };

    public countryCode = function() {
        //console.log('countryCode called!');
        this.findLocation(function() {
            //console.log('countryCode: ' + this.data.country_code);
            return this.data.country_code;
        });
    };

    public countryName = function() {
        //console.log('countryName called!');
        this.findLocation(function() {
            //console.log('countryName: ' + this.data.country_name);
            return this.data.country_name;
        });
    };

    public ip = function() {
        //console.log('ip called!');
        this.findLocation(function() {
            //console.log('ip: ' + this.data.ip);
            return this.data.ip;
        });
    };

    public latitude = function() {
        //console.log('latitude called!');
        this.findLocation(function() {
            //console.log('latitude: ' + this.data.latitude);
            return this.data.latitude;
        });
    };

    public longitude = function() {
        //console.log('longitude called!');
        this.findLocation(function() {
            //console.log('longitude: ' + this.data.longitude);
            return this.data.longitude;
        });
    };

    public metroCode = function() {
        //console.log('metroCode called!');
        this.findLocation(function() {
            //console.log('metroCode: ' + this.data.metro_code);
            return this.data.metro_code;
        });
    };

    public regionCode = function() {
        //console.log('regionCode called!');
        this.findLocation(function() {
            //console.log('regionCode: ' + this.data.region_code);
            return this.data.region_code;
        });
    };

    public regionName = function() {
        //console.log('regionName called!');
        this.findLocation(function() {
            //console.log('regionName: ' + this.data.region_name);
            return this.data.region_name;
        });
    };

    public timeZone = function() {
        //console.log('timeZone called!');
        this.findLocation(function() {
            //console.log('timeZone: ' + this.data.time_zone);
            return this.data.time_zone;
        });
    };

    public zipCode = function() {
        //console.log('zipCode called!');
        this.findLocation(function() {
            //console.log('zipCode: ' + this.data.zip_code);
            return this.data.zip_code;
        });
    };

    private findLocation(callback) {
        if (this.data != undefined) {
            callback();
            return;
        }
        //console.log('attempting to find location...');
        let url = 'http://freegeoip.net/json/';
        this.$http.get(url).then(
            function(response) {
                //console.log('ip address: ' + response.data.ip);
                this.data = response.data;
                callback();
            },
            function(response) {
                //console.log('bad response from freegeoip');
            }
        );
    }

    public findLocationCenter(callback) {
        this.findLocation(function() {
            callback(this.data.latitude, this.data.longitude);
        });
    }
}
