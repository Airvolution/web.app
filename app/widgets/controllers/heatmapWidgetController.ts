/// <reference path="../../../typings/tsd.d.ts" />

export = HeatmapWidgetController;

class HeatmapWidgetController {
    public static name = "HeatmapWidgetController";

    public center;
    public defaults;
    public tiles;
    public layers;
    public data = [];

    public static $inject = ['mapFactory', 'APIService','leafletData'];
    public constructor(
        private mapFactory,
        private APIService,
        private leafletData
    ) {
        this.getMapData();
        this.tiles = mapFactory.createTilesFromKey('light');
        this.center = {
            lat: 39.091042,
            lng: -98.178785,
            zoom: 3,
            draggable: false
        };
        this.defaults = {
            minZoom: 3,
            maxZoom: 3,
        };
        this.layers = {
            overlays: {
                heat: {
                    name: 'Heat Map',
                    type: 'heat',
                    data: this.data,
                    layerOptions: {
                        radius: 4,
                        blur: 14
                    },
                    visible: true
                }
            }
        };

        leafletData.getMap('heatmap').then(function(map) {
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.keyboard.disable();
        });
    }

    public getMapData() {
        let self = this;
        let bounds = {'northEast': {'lat': 89, 'lng': 179}, 'southWest': {'lat': -89, 'lng': -179}};
        self.APIService.asyncGetMarkersInside(bounds).then(
            function (response) {
                let data = response.data;
                for (let key in data) {
                    if (data[key]) {
                        let point = [data[key].location.lat, data[key].location.lng];
                        self.data.push(point);
                    }
                }
                self.layers.overlays.heat.doRefresh = true;
            }
        );
    }
}
