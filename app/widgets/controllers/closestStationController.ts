///<reference path="../../../typings/tsd.d.ts" />

import marker = L.marker;
import featureGroup = L.featureGroup;
export = ClosestStationWidgetController;

class ClosestStationWidgetController {
    public static name = 'ClosestStationWidgetController';
    public static $inject = ['mapFactory', 'APIService', 'leafletData',];

    public tiles;
    public myLocation;
    public station;
    public markers = [];
    public myLocationIcon = {
        iconSize: [35, 45],
        iconAnchor: [17, 28]
    };

    constructor(
        private mapFactory,
        private APIService,
        private leafletData
    ) {
        var self = this;

        APIService.locationService.asyncGetGeoCoordinates().then((location)=> {
            self.myLocation = location;

            APIService.asyncGetNearestStation(self.myLocation).then((station)=> {
                self.station = station;

                self.markers = [
                    {
                        lat: self.myLocation.lat,
                        lng: self.myLocation.lng,
                        icon: {
                            iconUrl: 'app/assets/images/markers/red.png',
                            iconSize: this.myLocationIcon.iconSize,
                            iconAnchor: this.myLocationIcon.iconAnchor
                        }
                    },
                    {
                        lat: self.station.location.lat,
                        lng: self.station.location.lng,
                        icon: mapFactory.getIconForMarker(station.aqi)
                    }
                ];

                var bounds = L.latLngBounds(self.markers);
                leafletData.getMap('closestmap').then(function(map) {
                    map.fitBounds(bounds,{padding:[50,50]});
                    map.dragging.disable();
                    map.touchZoom.disable();
                    map.doubleClickZoom.disable();
                    map.scrollWheelZoom.disable();
                    map.keyboard.disable();
                });

            });
        });

        this.tiles = mapFactory.createTilesFromKey('light');
    }
}
