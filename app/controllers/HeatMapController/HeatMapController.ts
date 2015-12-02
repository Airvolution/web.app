///<referecnce path="../../typings/tsd.d.ts"/>
declare var L;

export = HeatMapController;
class HeatMapController {
    // TODO: This controller is currently providing functionality for MAP
    // TODO: We should move this where it belongs at some point
    public static name = "HeatMapController";
    static $inject = ['$scope','leafletData', 'leafletBoundsHelpers', 'leafletMarkerEvents', '$http'];
    constructor(
        private $scope,
        private leafletData,
        private leafletBoundsHelpers,
        private leafletMarkerEvents,
        private $http
    ) {
        var bounds = leafletBoundsHelpers.createBoundsFromArray([
            // TODO: use location from IP address of client
            [ 41.381483, -110.387754],
            [ 39.640479, -112.236828 ]
        ]);

        angular.extend($scope, {
            bounds: bounds,
            center: {},
            defaults: {
                tileLayer: 'https://api.tiles.mapbox.com/v4/tjhooker33.o78l0n36/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGpob29rZXIzMyIsImEiOiJjaWg2emdkdGowZHJ4dTBrbDJmNmE4Y21mIn0.t0DvfElObK6T72UP5OO74g',
                maxZoom: 18,
                path: {
                    weight: 10,
                    color: '#800000',
                    opacity: 1
                }
            },
            events: {
                map: {
                    enable: ['moveend'],
                    logic: 'emit'
                },
                markers: {
                    enable: leafletMarkerEvents.getAvailableEvents()
                }
            }
        });

        $scope.mapEventDetected = 'No events yet...';
        $scope.markerEventDetected = 'Give me a click...';
        $scope.url = 'http://air.eng.utah.edu/api/'

        // TODO: It would be nice to make an API class
        //var data = leafletData.getMap('map').getBounds();
        var url = 'http://air.eng.utah.edu/api/ams/map'
        var str  = { 'northEast': { 'lat': 42, 'lng': -102 }, 'southWest': { 'lat': 36, 'lng': -117 } };
        var data = JSON.stringify(str);
        //$http.post(url, data, {} ).then(function() { alert('success' ), function() { alert('failure') } })

        var response = JSON.parse(this.getMockResponse(4));
        this.loadDeviceLocations(response);

        $scope.$on('leafletDirectiveMap.map.moveend', function(event) {
            // Jared, how do I call the private methods at the bottom of this class?
            $scope.mapEventDetected = "Map moved to " + $scope.bounds.northEast.lat;

            // TODO: API call to get [deviceIDs and locations]
            console.log('url: ' + $scope.url);

            var resp = {};
            resp['Taylor'] = { 'lat': 40.1, 'lng': -111.7 };
            resp['JaredM'] = { 'lat': 40.2, 'lng': -111.8 };
            resp['JaredP'] = { 'lat': 40.3, 'lng': -111.9 };
            resp['ZachLo'] = { 'lat': 40.4, 'lng': -111.6 };
            resp['YourMom'] = { 'lat': 40.5, 'lng': -111.5 };
            var resp_str = JSON.stringify(resp);

            // TODO: Parse the returned JSON
            var data = JSON.parse(resp_str);

            // Add custom attributes to each Marker
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    data[key]['clickable'] = true;
                    data[key]['riseOnHover'] = true;
                    data[key]['draggable'] = true;
                    data[key]['message'] = "Lat: " + data[key]['lat'] + "</br>Lng: " + data[key]['lng'];
                }
            }

            // Add markers to map
            $scope.markers = data;
        });

        $scope.$on('leafletDirectiveMarker.map.click', function(event, args){
            // Resource on how to add Marker Events
            // https://github.com/angular-ui/ui-leaflet/blob/master/examples/0513-markers-events-example.html
            $scope.markerEventDetected = event.name;
            console.log('a marker has been clicked');

            var data = { 'deviceID': args.modelName };

            // TODO: Stringify data to JSON
            // JSON.stringify(data);

            // TODO: Make API call

            // TODO: Open Details Panel / Details PLot
        });


        // TODO: keep this around for the actual HeatMap
        //    var heat = L.heatLayer([
        //        [40.1, -111.71, 1.0],
        //        [40.1, -111.72, 1.0],
        //        [40.1, -111.73, 1.0],
        //        [40.1, -111.74, 1.0],
        //        [40.1, -111.75, 1.0],
        //        [40.11, -111.71, 1.0],
        //        [40.12, -111.72, 1.0],
        //        [40.13, -111.73, 1.0],
        //        [40.14, -111.74, 1.0],
        //        [40.15, -111.75, 1.0],
        //        [40.16, -111.76, 1.0],
        //        [40.11, -111.71, 1.0],
        //        [40.12, -111.72, 1.0],
        //        [40.13, -111.73, 1.0],
        //        [40.14, -111.714, 1.0],
        //        [40.15, -111.725, 1.0],
        //        [40.16, -111.716, 1.0],
        //        [40.1, -111.8, 1.0],
        //        [40.1, -111.82, 1.0],
        //        [40.1, -111.83, 1.0],
        //        [40.1, -111.84, 1.0],
        //        [40.1, -111.85, 1.0],
        //        [40.11, -111.81, 1.0],
        //        [40.12, -111.82, 1.0],
        //        [40.13, -111.83, 1.0],
        //        [40.14, -111.84, 1.0],
        //        [40.15, -111.85, 1.0],
        //        [40.16, -111.86, 1.0],
        //        [40.11, -111.81, 1.0],
        //        [40.12, -111.82, 1.0],
        //        [40.13, -111.83, 1.0],
        //        [40.14, -111.814, 1.0],
        //        [40.15, -111.825, 1.0],
        //        [40.16, -111.816, 1.0],
        //        [40.2, -111.6, 1.0],
        //        [40.2, -111.62, 1.0],
        //        [40.2, -111.63, 1.0],
        //        [40.2, -111.64, 1.0],
        //        [40.2, -111.65, 1.0],
        //        [40.21, -111.61, 1.0],
        //        [40.22, -111.62, 1.0],
        //        [40.23, -111.63, 1.0],
        //        [40.24, -111.64, 1.0],
        //        [40.25, -111.65, 1.0],
        //        [40.26, -111.66, 1.0],
        //        [40.21, -111.61, 1.0],
        //        [40.22, -111.62, 1.0],
        //        [40.23, -111.63, 1.0],
        //        [40.24, -111.614, 1.0],
        //        [40.25, -111.625, 1.0],
        //        [40.26, -111.616, 1.0],
        //        [40.1, -111.7, 0.2]
        //    ], { radius: 50,
        //        blur: 15,
        //        maxZoom: 14}).addTo(map);
        //
        //});
    }

    private handleMapChange(map) {
        console.log('map moved, but to where?');
        var temp = this.$scope;
        console.log('alsfjk');
    }

    private getMockResponse(opt) {
        var response = {};
        switch(opt) {
            case 0:
                response['Taylor'] = { 'lat': 40.1, 'lng': -111.7, 'clickable': true, 'riseOnHover': true };
                //console.log('switch 0');
            case 1:
                response['JaredM'] = { 'lat': 40.2, 'lng': -111.8, 'clickable': true, 'riseOnHover': true };
                //console.log('switch 1');
            case 2:
                response['JaredP'] = { 'lat': 40.3, 'lng': -111.9, 'clickable': true, 'riseOnHover': true };
                //console.log('switch 2');
            case 3:
                response['ZachLo'] = { 'lat': 40.4, 'lng': -111.6, 'clickable': true, 'riseOnHover': true };
                //console.log('switch 3');
            case 4:
                response['YourMom'] = { 'lat': 40.5, 'lng': -111.5, 'clickable': true, 'riseOnHover': true };
                //console.log('switch 4');
            default:
                //console.log('switch default');
        }
        return JSON.stringify(response);
    }

    private loadDeviceLocations(data) {
        this.$scope.markers = data;
    }
}