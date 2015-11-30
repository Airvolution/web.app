/// <reference path="../../typings/tsd.d.ts" />
declare var L;

var map = L.map('map').setView([40.1, -111.5], 11);

// This is how we get the map data from Mapbox
// { access_token } -- PUT YOUR MAPBOX API TOKEN THERE
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={access_token}', {
    maxZoom: 18,
    attribution: 'from my mind',
    id: 'tjhooker33.o78l0n36',
    access_token: 'pk.eyJ1IjoidGpob29rZXIzMyIsImEiOiJjaWg2emdkdGowZHJ4dTBrbDJmNmE4Y21mIn0.t0DvfElObK6T72UP5OO74g'
}).addTo(map);

// This is how we customize the device location icon
var myIcon = L.icon({
    iconUrl: '/app/assets/images/icon.png',
    iconRetinaUrl: '/app/assets/images/icon@2x.png',
    iconSize: [60, 76],
    iconAnchor: [20, 20],
    popupAnchor: [-3, -76],
    shadowUrl: '/app/assets/images/icon.png',
    shadowRetinaUrl: '/app/assets/images/icon@2x.png',
    shadowSize: [0, 0],
    shadowAnchor: [22, 94]
});

// This is how we display device locations
L.marker([40.686379, -111.826387], { icon: myIcon }).addTo(map);
L.marker([40.1, -111.7], { icon: myIcon }).addTo(map);
L.marker([40.2, -111.8], { icon: myIcon }).addTo(map);
L.marker([40.11, -111.81], { icon: myIcon }).addTo(map);
L.marker([40.22, -111.82], { icon: myIcon }).addTo(map);
L.marker([40.33, -111.72], { icon: myIcon }).addTo(map);

// This is how we display data points
//var heat = L.heatLayer([
//    [40.1, -111.71, 1.0],
//    [40.1, -111.72, 1.0],
//    [40.1, -111.73, 1.0],
//    [40.1, -111.74, 1.0],
//    [40.1, -111.75, 1.0],
//    [40.11, -111.71, 1.0],
//    [40.12, -111.72, 1.0],
//    [40.13, -111.73, 1.0],
//    [40.14, -111.74, 1.0],
//    [40.15, -111.75, 1.0],
//    [40.16, -111.76, 1.0],
//    [40.11, -111.71, 1.0],
//    [40.12, -111.72, 1.0],
//    [40.13, -111.73, 1.0],
//    [40.14, -111.714, 1.0],
//    [40.15, -111.725, 1.0],
//    [40.16, -111.716, 1.0],
//    [40.1, -111.8, 1.0],
//    [40.1, -111.82, 1.0],
//    [40.1, -111.83, 1.0],
//    [40.1, -111.84, 1.0],
//    [40.1, -111.85, 1.0],
//    [40.11, -111.81, 1.0],
//    [40.12, -111.82, 1.0],
//    [40.13, -111.83, 1.0],
//    [40.14, -111.84, 1.0],
//    [40.15, -111.85, 1.0],
//    [40.16, -111.86, 1.0],
//    [40.11, -111.81, 1.0],
//    [40.12, -111.82, 1.0],
//    [40.13, -111.83, 1.0],
//    [40.14, -111.814, 1.0],
//    [40.15, -111.825, 1.0],
//    [40.16, -111.816, 1.0],
//    [40.2, -111.6, 1.0],
//    [40.2, -111.62, 1.0],
//    [40.2, -111.63, 1.0],
//    [40.2, -111.64, 1.0],
//    [40.2, -111.65, 1.0],
//    [40.21, -111.61, 1.0],
//    [40.22, -111.62, 1.0],
//    [40.23, -111.63, 1.0],
//    [40.24, -111.64, 1.0],
//    [40.25, -111.65, 1.0],
//    [40.26, -111.66, 1.0],
//    [40.21, -111.61, 1.0],
//    [40.22, -111.62, 1.0],
//    [40.23, -111.63, 1.0],
//    [40.24, -111.614, 1.0],
//    [40.25, -111.625, 1.0],
//    [40.26, -111.616, 1.0],
//    [40.1, -111.7, 0.2]
//], { radius: 50,
//    blur: 15,
//    maxZoom: 14 }).addTo(map);
