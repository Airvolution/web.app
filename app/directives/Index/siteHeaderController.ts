/// <reference path="../../../typings/tsd.d.ts" />

export = SiteHeaderController;

class SiteHeaderController {
    public location;
    public aqi;
    public category;
    public healthLabel;
    public showPopup;

    public emailHash;

    public static $inject = [
        '$scope',
        '$uibModal',
        'AuthService',
        'locationService',
        'APIService',
        'md5',
        'notificationService',
        'AQIService'
    ];

    constructor(private $scope,
                private $uibModal,
                private AuthService,
                private locationService,
                private APIService,
                private md5,
                private notificationService,
                private AQIService) {
        this.showPopup = false;
        var self = this;
        //TODO logic here to check if user has a default location/station set. If so use that instead of current location
        locationService.asyncGetGeoCoordinates().then((response)=> {
            self.updateNearestStation(response.lat, response.lng);
        });

        notificationService.subscribe($scope,'UserLogin',()=>{
           self.fillEmailHash();
        });
        notificationService.subscribe($scope,'UserLogout',()=>{
            self.emailHash = '';
        });
        this.fillEmailHash();
    }

    private fillEmailHash(){
        if(this.AuthService.authentication.isAuth){
            var email = this.AuthService.authentication.userName;
            email = email.trim();
            email = email.toLowerCase();
            this.emailHash = this.md5.createHash( email || '');
        }
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
            self.category = self.AQIService.getCategoryFromAqi(self.aqi);
            self.healthLabel = self.AQIService.getHealthLabelFromAqi(self.aqi);
        });
    }
}
