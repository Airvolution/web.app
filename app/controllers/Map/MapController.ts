///<referecnce path="../../typings/tsd.d.ts"/>
declare var L;

export = MapController;
class MapController {
    // TODO: This controller is currently providing functionality for MAP
    // TODO: We should move this where it belongs at some point
    public static name = "MapController";
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
            layers: {
                baselayers: {
                    light_map: {
                        name: 'Light Map',
                        url: 'https://api.tiles.mapbox.com/v4/tjhooker33.o78l0n36/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGpob29rZXIzMyIsImEiOiJjaWg2emdkdGowZHJ4dTBrbDJmNmE4Y21mIn0.t0DvfElObK6T72UP5OO74g',
                        type: 'xyz'
                    },
                    dark_map: {
                        name: 'Dark Map',
                        url: 'https://api.tiles.mapbox.com/v4/tjhooker33.o780o9a3/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGpob29rZXIzMyIsImEiOiJjaWg2emdkdGowZHJ4dTBrbDJmNmE4Y21mIn0.t0DvfElObK6T72UP5OO74g',
                        type: 'xyz'
                    },
                    satellite_map: {
                        name: 'Satellite Map',
                        url: 'https://api.tiles.mapbox.com/v4/tjhooker33.oc2el95l/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGpob29rZXIzMyIsImEiOiJjaWg2emdkdGowZHJ4dTBrbDJmNmE4Y21mIn0.t0DvfElObK6T72UP5OO74g',
                        type: 'xyz'
                    }
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
        
        // TODO: It would be nice to make an API class
        console.log('bounds: ' + $scope.bounds.northEast.lat);
        var url = 'api/frontend/map'
        var obj  = { 'northEast': { 'lat': 89, 'lng': 179 }, 'southWest': { 'lat': -89, 'lng': -179 } };
        var data = JSON.stringify(obj);
        console.log('JSON: ' + data);
        $http.post(url, data, {} ).then(
            function(response) {
                console.log('Success!');
                console.log('  status: ' + response.status);
                console.log('======================');
                

                // TODO: Parse the returned DATA into JSON
                var data = response.data['ams'];

                // Add custom attributes to each Marker
                for (var key in data) {
                    //console.log('key: ' + key);
                    if (data.hasOwnProperty(key)) {
                        data[key]['clickable'] = true;
                        data[key]['icon'] = { 
                            iconUrl: 'static/images/green.png', 
                            iconSize: [35,45], 
                            iconAnchor: [17,28] 
                        };
                    }
                }

                // Add markers to map
                $scope.markers = data;
            },
            function(response) {
                console.log('Failure!');
                console.log('  status: ' + response.status);
                console.log('======================');
            }
        );
        
        var url = 'api/frontend/daq'
        var data = JSON.stringify(obj);
        console.log('JSON: ' + data);
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
                var daqSites = [];
                
                // Add custom attributes to each Marker
                for (var index in data) {
                    var site = data[index]['site'];
                    var obj = ({ 
                        deviceID: site['name'], 
                        lat: site['latitude'], 
                        lng: site['longitude'], 
                        'clickable': true, 
                        'icon': { 
                            iconUrl: 'static/images/red.png', 
                            iconSize: [35,45], 
                            iconAnchor: [17,28] 
                        } 
                    });
                    $scope.markers.push(obj);
                }
            },
            function(response) {
                console.log('Failure!');
                console.log('  status: ' + response.status);
                console.log('======================');
            }
        );
       
       /*
        // TODO: Please DO NOT DELETE - we may want this functionality later
        $scope.$on('leafletDirectiveMap.map.moveend', function(event) {
            var url = 'api/frontend/map'
            var obj  = { 'northEast': { 'lat': 89, 'lng': 179 }, 'southWest': { 'lat': -89, 'lng': -179 } };
            var data = JSON.stringify(obj);
            console.log('JSON: ' + data);
            $http.post(url, data, {} ).then(
                function(response) {
                    console.log('Success!');
                    console.log('  status: ' + response.status);
                    console.log('======================');

                    var data = response.data['ams'];

                    // Add custom attributes to each Marker
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            data[key]['clickable'] = true;
                            data[key]['message'] = "Lat: " + data[key]['lat'] + "</br>Lng: " + data[key]['lng'];
                        }
                    }

                    // Add markers to map
                    $scope.markers = data;
                },
                function(response) {
                    console.log('Failure!');
                    console.log('  status: ' + response.status);
                    console.log('======================');
                }
            );
            
            var url = 'api/frontend/daq'
            var data = JSON.stringify(obj);
            console.log('JSON: ' + data);
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
                    var daqSites = [];
                    
                    // Add custom attributes to each Marker
                    for (var index in data) {
                    var site = data[index]['site'];
                    var obj = ({ deviceID: site['name'], lat: site['latitude'], lng: site['longitude'], 'clickable': true, 'message': 'PM2.5: ' + site['data']['pm25'] + '</br>CO: ' + site['data']['co'] + '</br>NO2: ' + site['data']['no2'] + '</br>O3: ' + site['data']['ozone'] + '</br>SO2: ' + site['data']['so2'] + '</br>Temperature: ' + site['data']['temperature'] + '</br>Date: ' + site['data']['date'] });
                    console.log($scope.markers);
                    $scope.markers.push(obj);
                    }
                    console.log($scope.markers);
                    console.log($scope.markers);
                },
                function(response) {
                    console.log('Failure!');
                    console.log('  status: ' + response.status);
                    console.log('======================');
                }
            );
        });
        */

        $scope.$on('leafletDirectiveMarker.map.click', function(event, args){
            // Resource on how to add Marker Events
            // https://github.com/angular-ui/ui-leaflet/blob/master/examples/0513-markers-events-example.html
            console.log('a marker has been clicked');
           
            var pscope = $scope.$parent;
           
            if (pscope.station && pscope.station.id && args.model.deviceID == pscope.station.id) {
                pscope.showDetails = false;
                pscope.plotVisible = false;
                pscope.station = undefined;
                return;
            }
           
            var id = args.model.deviceID;
            if (id == 'Box Elder County' || id == 'Cache County' || id == 'Price' || id == 'Davis County' || id == 'Duchesne County' || id == 'Salt Lake County' || id == 'Tooele County' || id == 'Uintah County' || id == 'Utah County' || id =='Washington County' || id == 'Weber County') {
                
                pscope.station = { location: {}, last: {} };
                    
                pscope.station.id           = args.model.deviceID;
                pscope.station.location.lat = args.model.lat;
                pscope.station.location.lng = args.model.lng;
                
                // TODO: get latest values from deq site
                
                pscope.showDetails = true;
                    
                if (pscope.plotVisible) {
                    pscope.pctrl.togglePlot(false);
                }
                return;
            }
            
            var url = 'api/frontend/singleLatest';
            var obj = JSON.stringify(id);
            console.log('JSON: ' + obj);
            $http({
                url:url,
                data:obj,
                method: 'POST'
                }).then(
                function(response) {
                    console.log('Success!');
                    console.log('  status: ' + response.status);
                    console.log('======================');
    
                    pscope.station = { location: {}, last: {} };
                    
                    pscope.station.id           = args.model.deviceID;
                    pscope.station.location.lat = args.model.lat;
                    pscope.station.location.lng = args.model.lng;
                    
                    var data = response.data;

                    // TODO: the current API really doesn't make this easy
                    pscope.station.last.pm       = data['pm'];
                    pscope.station.last.co       = data['co'];
                    pscope.station.last.co2      = data['co2'];
                    pscope.station.last.no2      = data['no2'];
                    pscope.station.last.o3       = data['os3'];
                    pscope.station.last.temp     = data['temp'];
                    pscope.station.last.humidity = data['humidity'];
                    pscope.station.last.pressure = data['pressure'];
                    pscope.station.last.altitude = data['altitude'];                    

                    pscope.showDetails = true;
                    
                    if (pscope.plotVisible) {
                        pscope.pctrl.togglePlot(false);
                    }
                },
                function(response) {
                    console.log('Failure!');
                    console.log('  status: ' + response.status);
                    console.log('======================');
                }
            );
        });
    }
}