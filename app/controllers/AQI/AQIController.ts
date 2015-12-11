///<referecnce path="../../typings/tsd.d.ts"/>

export = AQIController;
class AQIController {
    public static name = "AQIController";
    static $inject = ['$scope', '$http'];
    public localAQI;
    public localCategory;
    public showPopup = false;

    constructor(private $scope,
                private $http) {

        console.log('AQIController constructor');
        this.localAQI = '';

        var url = 'api/frontend/aqi'
        var self = this;
        $http({
            url: url,
            method: 'GET'
        }).then(
            function(response) {
                console.log('Success!');
                console.log('  status: ' + response.status);
                console.log('======================');

                // TODO: Parse the returned DATA into JSON
                var data = response.data;
                self.localAQI = data['AQI'];
                self.localCategory = data['Category']['Name'];
            },
            function(response) {
                console.log('Failure!');
                console.log('  status: ' + response.status);
                console.log('======================');
            }
        );
    }
}
