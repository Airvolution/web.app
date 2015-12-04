///<referecnce path="../../typings/tsd.d.ts"/>

import Globals = require("../../Globals");

export = MyStationsController;

class MyStationsController {
    public static name = "MyStationsController";
    static $inject = [];
    constructor(){}

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
        }
    ];

    public stations = [
        {
            id: '12345',
            name: 'Home_Station',
            purpose: 'blah blah blah',
            owner: 'Joe User',
            private: true,
            indoor: true,
            location: {
                name: 'Salt Lake City',
                lat: 40.1,
                lng: -111.5
            },
            lastUpdated: 'ast updated 1/1/1990 at 9:33pm',
            hasError: true,
            hasWarning: false
        },
        {
            id: '12346',
            name: '',
            purpose: 'blah blah blah',
            owner: 'Joe User',
            private: true,
            indoor: true,
            location: {
                name: 'Salt Lake City',
                lat: 40,
                lng: -111.6
            },
            lastUpdated: 'Last updated 1/1/1990 at 9:33pm',
            hasError: false,
            hasWarning: true
        },
        {
            id: '12347',
            name: 'Home_Station',
            purpose: 'blah blah blah',
            owner: 'Joe User',
            private: true,
            indoor: true,
            location: {
                name: 'Salt Lake City',
                lat: 39.9,
                lng: -111.7
            },
            lastUpdated: 'Last updated 1/1/1990 at 9:33pm',
            hasError: true,
            hasWarning: false
        }
    ];
}