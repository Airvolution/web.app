///<referecnce path="../../typings/tsd.d.ts"/>

import Globals = require("../../Globals");

export = MyStationsController;

class MyStationsController {
    public static name = "MyStationsController";
    static $inject = ['$http'];
    constructor($http){
        $http({
            url: 'api/frontend/getUserDeviceStates',
            method: 'GET'
        }).then(function(data){
            this.stations = JSON.parse(data);
        })
    }

    public notifications = [
        {
            type: 'error',
            subtype: 'offline',
            stationId: '12345'
        },
        {
            type: 'warning',
            subtype: 'malfunctioning',
            stationId: '12346'
        },
        {
            type: 'error',
            subtype: 'misconfigured',
            stationId: '12347'
        },
        {
            type: 'error',
            subtype: 'offline',
            stationId: '12345'
        }
    ];

    public stations = [];
}