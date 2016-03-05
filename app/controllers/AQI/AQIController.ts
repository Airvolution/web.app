///<referecnce path='../../typings/tsd.d.ts'/>

export = AQIController;
class AQIController {
    public static name = 'AQIController';
    public static $inject = ['$scope', '$http', 'locationService', 'APIService'];
    public localCity = '';
    public localRegion = '';
    public localAQI = '';
    public localCategory = '';
    public showPopup = false;

    constructor(
        private $scope,
        private $http,
        private locationService,
        private APIService
    ) {
        console.log('AQIController constructor');
        this.getClientAQI();
    }

    private getClientAQI() {
        let self = this;
        self.locationService.asyncGetGeoCoordinates().then(
            function (response) {
                self.APIService.asyncGetNearestStation({
                    lat: response.lat,
                    lng: response.lng
                }).then(
                    function (response) {
                        self.localCity = response.city;
                        self.localRegion = response.state;
                        self.localAQI = response.aqi;
                        self.localCategory = self.getCategoryFromAQI(self.localAQI);
                    },
                    function (response) {
                        // TODO: handle error
                    }
                );
            },
            function (response) {
                // TODO: handle error
            }
        );
    }

    private getCategoryFromAQI(aqi) {
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
