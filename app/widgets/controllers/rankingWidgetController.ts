/// <reference path="../../../typings/tsd.d.ts" />

export = RankingWidgetController;

class RankingWidgetController {
    public static name = "RankingWidgetController";

    public loading;

    public yourStation;
    public yourLocation;

    public bestNationalStation;
    public worstNationalStation;

    public bestNationalLocation;
    public worstNationalLocation;

    public nationalRank;
    public nationalTotal;

    public bestStateStation;
    public worstStateStation;

    public bestStateLocation;
    public worstStateLocation;

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
                self.calculateStateAndNationalRankings(dailies, response.data);

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

    public setBestWorstAndRankings(stations){
        var stateTotalCount = 0;
        var lastStateStation = 0;
        var nationalTotalCount = 0;

        var bestStateStationTemp;
        var bestNationalStationTemp;

        for (var i = 0; i < stations.length; i++){
            if (stations[i].parameter != null){

                if (typeof bestNationalStationTemp == 'undefined'){
                    bestNationalStationTemp = stations[i];
                }

                if (stations[i].id==this.yourStation.id) {
                    this.stateRank = stateTotalCount + 1;
                    this.nationalRank = nationalTotalCount + 1;
                }

                if (stations[i].state==this.yourStation.state){
                    if (stateTotalCount == 0){
                        bestStateStationTemp = stations[i];
                    }

                    stateTotalCount++;
                    lastStateStation = i;
                }
                nationalTotalCount++;
            }

        }

        // Set important values
        this.nationalTotal = nationalTotalCount;
        this.bestNationalStation = bestNationalStationTemp;
        this.worstNationalStation = stations[stations.length-1];


        this.stateTotal = stateTotalCount;
        this.bestStateStation = bestStateStationTemp;
        this.worstStateStation = stations[lastStateStation];
    }

    public calculateStateAndNationalRankings(dailies, markers) {
        if (!markers || !dailies) {
            this.loading = true;
            return;
        }

        // Sort Markers
        markers.sort((a, b) => a.aqi - b.aqi);

        // Get your station
        this.yourStation = this.getStationAndNationalRanking(dailies[0].station_Id, markers);

        // Set best & worst stations, as well as yourStations rankings
        this.setBestWorstAndRankings(markers);


        // Create strings for making the widget load pretty
        this.bestNationalLocation = this.bestNationalStation.city + ", " + this.bestNationalStation.state;
        this.bestStateLocation = this.bestStateStation.city + ", " + this. bestStateStation.state;

        this.worstNationalLocation = this.worstNationalStation.city + ", " + this.worstNationalStation.state;
        this.worstStateLocation = this.worstStateStation.city + ", " + this.worstStateStation.state;

        this.yourLocation = this.yourStation.city + ", " + this.yourStation.state;
    }
}
