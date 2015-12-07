///<referecnce path="../../typings/tsd.d.ts"/>

export = AQIController;
class AQIController {
    public static name = "AQIController";
    static $inject = ['$scope', '$http'];
    public localAQI;

    constructor(private $scope,
                private $http) {

        console.log('AQIController constructor');
        this.localAQI = 77;
    }
}
