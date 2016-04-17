/// <reference path="../../../typings/tsd.d.ts" />

export = RankingWidgetController;

class RankingWidgetController {
    public static name = "RankingWidgetController";

    public someValue;
    public loading;

    public static $inject = ['$scope', '$log', 'APIService'];
    public constructor (
        private $scope,
        private $log,
        private APIService
    ) {
        let self = this;
        let bounds = {'northEast': {'lat': 89, 'lng': 179}, 'southWest': {'lat': -89, 'lng': -179}};
        this.APIService.asyncGetMarkersInside(bounds).then((response) => {
            self.someFunction(response.data);
        });
    }

    public someFunction(markers) {
        if (!markers) {
            this.loading = true;
            return;
        }

        this.someValue = markers[0].aqi;

        this.loading = false;
    }
}
