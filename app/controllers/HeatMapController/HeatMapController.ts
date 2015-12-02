///<referecnce path="../../typings/tsd.d.ts"/>
declare var L;

export = HeatMapController;
class HeatMapController {
    public static name = "HeatMapController";
    static $inject = ['$scope','leafletData', '$http'];
    constructor(
        private $scope,
        private leafletData,
        private $http
    ) {
        angular.extend($scope, {
            center: {
                lat: 40.1,
                lng: -111.5,
                zoom: 11
            },
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
                }
            },
            //markers: {
            //    Taylor: {
            //        lat: 40.1,
            //        lng: -111.7
            //    },
            //    JaredM: {
            //        lat: 40.2,
            //        lng: -111.8
            //    },
            //    JaredP: {
            //        lat: 40.3,
            //        lng: -111.9
            //    },
            //    Zach: {
            //        lat: 40.4,
            //        lng: -111.6
            //    }
            //}
        });

        //var data = leafletData.getMap('map').getBounds();
        var url = 'http://localhost:2307/api/ams/map'
        var str  = { 'northEast': { 'lat': 42, 'lng': -102 }, 'southWest': { 'lat': 36, 'lng': -117 } };
        var data = JSON.stringify(str);



        $http.post(url, data, {} ).then(function() { alert('success' ), function() { alert('failure') } })




        $scope.$on('leafletDirectiveMap.map.moveend', function(event){
            console.log("moveend");
        });


        //leafletData.getMap().then(function(map) {
        //    var marker = L.icon({
        //        iconUrl: '/static/images/icon.png',
        //        iconRetinaUrl: '/static/images/icon@2x.png',
        //        iconSize: [60, 76],
        //        iconAnchor: [20, 20],
        //        popupAnchor: [0, 0],
        //        shadowUrl: '/static/images/icon.png',
        //        shadowRetinaUrl: '/static/images/icon@2x.png',
        //        shadowSize: [0, 0],
        //        shadowAnchor: [22, 94]
        //    });
        //
        //    function markerClick(deviceID, coordinate) {
        //        // Here we can open the Details Panel
        //        console.log('DeviceID: ' + deviceID + '\tLatitude: ' + coordinate[0] + '\tLongitude: ' + coordinate[1]);
        //        console.log('Bounds: ' + map.getBounds());
        //    }
        //
        //    // TODO: We need an event for when the map changes
        //
        //    function mapMoveEnd() {
        //        lastBounds = currBounds;
        //        currBounds = map.getBounds();
        //        console.log('The map has moved');
        //    }
        //
        //    // Each time the map moves, we need to find out which devices to display on the map
        //    currBounds = map.getBounds();
        //    map.on('moveend', mapMoveEnd);
        //
        //    // TODO: API call for AMS devices relative to $scope.center
        //    //{
        //    //    "ams": [{
        //    //    "deviceID": "mac_addr",
        //    //    "lat": 40,
        //    //    "lng": -111
        //    //}, {
        //    //    "deviceID": "mac_addr",
        //    //    "lat": 40,
        //    //    "lng": -111
        //    //}]
        //    //}
        //
        //
        //    // This is how we display device locations
        //    var m = L.marker([40.6, -111.9], { icon: marker }).bindPopup("Lat: " + 40.686379 + "<br>Long: " + -111.826387);
        //    m.on('click', function() { markerClick('Mine', [40.686379, -111.826387]) });
        //    m.addTo(map);
        //
        //    var m = L.marker([40.1, -111.8], { icon: marker }).bindPopup("Lat: " + 40.1 + "<br>Long: " + -111.7);
        //    m.on('click', function() { markerClick('Your Mom\'s', [40.1, -111.7]) });
        //    m.addTo(map);
        //
        //    var m = L.marker([40.2, -111.7], { icon: marker }).bindPopup("Lat: " + 40.2 + "<br>Long: " + -111.8);
        //    m.on('click', function() { markerClick('Zach\'s', [40.2, -111.8]) });
        //    m.addTo(map);
        //
        //    var m = L.marker([40.11, -111.81], { icon: marker }).bindPopup("Lat: " + 40.11 + "<br>Long: " + -111.81);
        //    m.on('click', function() { markerClick('JM\'s', [40.11, -111.81]) });
        //    m.addTo(map);
        //
        //    var m = L.marker([40.33, -111.72], { icon: marker }).bindPopup("Lat: " + 40.33 + "<br>Long: " + -111.72);
        //    m.on('click', function() { markerClick('JP\'s', [40.33, -111.72]) } );
        //    m.addTo(map);
        //
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
}