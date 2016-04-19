/// <reference path="../../../typings/tsd.d.ts" />

export = RankingWidgetController;

class RankingWidgetController {
    public static name = "RankingWidgetController";

    public loading;

    public yourStation;
    public yourLocation;
    public yourState;

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

    public stateRankMsg;
    public nationalRankMsg;

    public states = {
        "AL":"Alabama",
        "AK":"Alaska",
        "AZ":"Arizona",
        "AR":"Arkansas",
        "CA":"California",
        "CO":"Colorado",
        "CT":"Connecticut",
        "DE":"Delaware",
        "DC":"District of Columbia",
        "FL":"Florida",
        "GA":"Georgia",
        "HI":"Hawaii",
        "ID":"Idaho",
        "IL":"Illinois",
        "IN":"Indiana",
        "IA":"Iowa",
        "KS":"Kansas",
        "KY":"Kentucky",
        "LA":"Louisiana",
        "ME":"Maine",
        "MD":"Maryland",
        "MA":"Massachusetts",
        "MI":"Michigan",
        "MN":"Minnesota",
        "MS":"Mississippi",
        "MO":"Missouri",
        "MT":"Montana",
        "NE":"Nebraska",
        "NV":"Nevada",
        "NH":"New Hampshire",
        "NJ":"New Jersey",
        "NM":"New Mexico",
        "NY":"New York",
        "NC":"North Carolina",
        "ND":"North Dakota",
        "OH":"Ohio",
        "OK":"Oklahoma",
        "OR":"Oregon",
        "PA":"Pennsylvania",
        "RI":"Rhode Island",
        "SC":"South Carolina",
        "SD":"South Dakota",
        "TN":"Tennessee",
        "TX":"Texas",
        "UT":"Utah",
        "VT":"Vermont",
        "VA":"Virginia",
        "WA":"Washington",
        "WV":"West Virginia",
        "WI":"Wisconsin",
        "WY":"Wyoming"};

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
        this.yourState = this.states[this.yourStation.state];

        this.stateRankMsg = this.stateRank + " out of " + this.stateTotal + " for cleanest air in " + this.yourState;
        this.nationalRankMsg = this.nationalRank + " out of " + this.nationalTotal + " for cleanest air in the U.S.A.";
    }
}
