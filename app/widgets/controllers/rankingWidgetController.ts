/// <reference path="../../../typings/tsd.d.ts" />

export = RankingWidgetController;

class RankingWidgetController {
    public static name = "RankingWidgetController";

    public someValue;
    public loading;

    public bestStation;
    public worstStation;
    public yourStation;

    public nationalRank;

    public static $inject = ['$scope', '$log', 'APIService'];
    public constructor (
        private $scope,
        private $log,
        private APIService
    ) {
        let self = this;

        let unregisterDailies = $scope.$watch('dailies', (dailies) => {
            let bounds = {'northEast': {'lat': 89, 'lng': 179}, 'southWest': {'lat': -89, 'lng': -179}};
            this.APIService.asyncGetMarkersInside(bounds).then((response) => {
                self.someFunction(dailies, response.data);

                this.loading = false;
            });
        });

        $scope.$on("$destroy", () => {
            unregisterDailies();
        });
    }

    public getStationAndRanking(stationID, stations) {
        for (var i = 0; i < stations.length; i++){
            if (stations[i].id==stationID){
                this.nationalRank = i;
                return stations[i];
            }

        }
    }

    public someFunction(dailies, markers) {
        if (!markers || !dailies) {
            this.loading = true;
            return;
        }

        markers.sort((a, b) => a.aqi - b.aqi);

        this.yourStation = this.getStationAndRanking(dailies[0].station_Id, markers);
        this.bestStation = markers[0];
        this.worstStation = markers[markers.length-1];



    }
}
