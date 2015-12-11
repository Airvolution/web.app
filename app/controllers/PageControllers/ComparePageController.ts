///<reference path="../../../typings/tsd.d.ts" />
declare var _;

export = ComparePageController;

class ComparePageController {
    public static name = "ComparePageController";
    static $inject = ['$scope', '$http'];

    public stations = [];
    public plots = [];
    constructor(private $scope,
                private $http) {
        var self = this;
        $http({
            url: 'api/front/getUserDeviceStates',
            method: 'GET'
        }).then(function(data){
            self.stations = data.data;
        });
    };
}