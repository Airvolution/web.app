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
    public nationalTotal;

    public bestStateStation;
    public worstStateStation;

    public stateRank;
    public stateTotal;

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

    public getStationAndNationalRanking(stationID, stations) {
        for (var i = 0; i < stations.length; i++){
            if (stations[i].id==stationID){
                this.nationalRank = i+1;
                return stations[i];
            }

        }
    }

    public setStateRankingAndLength(stations){
        var stateTotalCount = 0;
        var lastStateStation = 0;

        for (var i = 0; i < stations.length; i ++){
            if (stations[i].id==this.yourStation.id) {
                this.stateRank = stateTotalCount + 1;
            }

            if (stations[i].state==this.yourStation.state){
                if (stateTotalCount == 0){
                    this.bestStateStation = stations[i];
                }

                stateTotalCount++;
                lastStateStation = i;
            }

        }
        this.stateTotal = stateTotalCount;
        this.worstStateStation = stations[lastStateStation];
    }

    public someFunction(dailies, markers) {
        if (!markers || !dailies) {
            this.loading = true;
            return;
        }

        markers.sort((a, b) => a.aqi - b.aqi);

        this.nationalTotal = markers.length;
        this.yourStation = this.getStationAndNationalRanking(dailies[0].station_Id, markers);
        this.setStateRankingAndLength(markers);
        this.bestStation = markers[0];
        this.worstStation = markers[markers.length-1];
    }
}
