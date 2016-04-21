/// <reference path="../../../typings/tsd.d.ts" />

export = SiteHeaderController;

class SiteHeaderController {
    public location;
    public aqi;
    public category;
    public showPopup = false;

    public static $inject = [
        '$scope',
        '$uibModal',
        'AuthService',
        'locationService',
        'APIService'
    ];

    constructor(private $scope,
                private $uibModal,
                private AuthService,
                private locationService,
                private APIService) {
        var self = this;
        //TODO logic here to check if user has a default location/station set. If so use that instead of current location
        locationService.asyncGetGeoCoordinates().then((response)=> {
            self.updateNearestStation(response.lat, response.lng);
        });
    }

    private updateNearestStation(lat:number, lng:number) {
        var self = this;
        this.APIService.asyncGetNearestStation({lat: lat, lng: lng}).then((station)=> {
            self.location = {
                city: station.city,
                state: station.state,
                lat: station.lat,
                lng: station.lng
            };
            self.aqi = station.aqi;

            //TODO extract this and inject it in a service. This code is many other places
            self.category = self.getCategoryFromAqi(station.aqi);
        });
    }


    private getCategoryFromAqi(aqi) {
        if (aqi < 0) {
            return '';
        } else if (aqi <= 50) {
            return 'Good';
        } else if (aqi <= 100) {
            return 'Moderate';
        } else if (aqi <= 150) {
            return 'Unhealthy for sensitive groups';
        } else if (aqi <= 200) {
            return 'Unhealthy';
        } else if (aqi <= 300) {
            return 'Very Unhealthy';
        } else {
            return 'Hazardous';
        }
    }
}