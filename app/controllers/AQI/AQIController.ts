///<referecnce path='../../typings/tsd.d.ts'/>

export = AQIController;
class AQIController {
    public static name = 'AQIController';
    public static $inject = ['$scope', '$http'];
    public localAQI;
    public localCategory;
    public showPopup = false;

    constructor(private $scope,
                private $http) {

        console.log('AQIController constructor');
        this.localAQI = '';

        let url = 'api/frontend/aqi';
        let self = this;
        $http({
            url: url,
            method: 'GET'
        }).then(
            function(response) {
                console.log('Success!');
                console.log('  status: ' + response.status);
                console.log('======================');

                // TODO: Parse the returned DATA into JSON
                let data = response.data;
                self.localAQI = data['aqi'];
                self.localCategory = data['category']['name'];
            },
            function(response) {
                console.log('Failure!');
                console.log('  status: ' + response.status);
                console.log('======================');
            }
        );
    }
}
