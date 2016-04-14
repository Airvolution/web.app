/// <reference path="../../../typings/tsd.d.ts" />

export = HeatmapWidgetController;

class HeatmapWidgetController {
    public static name = "HeatmapWidgetController";

    public center;
    public defaults;
    public tiles;
    public layers;
    public data = [];

    public static $inject = ['mapFactory', 'APIService'];
    public constructor(
        private mapFactory,
        private APIService
    ) {
        this.getMapData();
        this.tiles = mapFactory.createTilesFromKey('light');
        this.center = {
            lat: 44,
            lng: -98,
            zoom: 3
        };
        this.defaults = {
            minZoom: 3,
            maxZoom: 3,
            //dragging: false
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
    }

    public getMapData() {
        let self = this;
        let bounds = {'northEast': {'lat': 89, 'lng': 179}, 'southWest': {'lat': -89, 'lng': -179}};
        self.APIService.asyncGetMarkersInside(bounds).then(
            function (response) {
                let data = response.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        let point = [data[key].location.lat, data[key].location.lng];
                        self.data.push(point);
                    }
                }
            }
        );
    }
}
