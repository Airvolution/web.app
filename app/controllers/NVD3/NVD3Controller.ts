///<referecnce path='../../typings/tsd.d.ts'/>

declare let d3;

export = NVD3Controller;

class NVD3Controller {
    public static name = 'NVD3Controller';
    public options;
    public data;
    public static $inject = ['$scope', '$http', '$log', 'amsAPIService'];
    constructor(
        private $scope,
        private $http,
        private $log,
        private amsAPIService
    ) {

    }

    public generatePlot() {
        let pscope = this.$scope.$parent;
        if (!pscope.station || !pscope.station.id) {
            return;
        }

        this.unsetChartData();
        let id = pscope.station.id;
        if (this.stationIsFromEPA(id)) {
            this.getDataForEPAPlot(id);
        } else {
            this.getDataForPlot(id);
        }
    }

    private stationIsFromEPA(stationID) {
        return (stationID == 'Box Elder County' ||
                stationID == 'Cache County' ||
                stationID == 'Price' ||
                stationID == 'Davis County' ||
                stationID == 'Duchesne County' ||
                stationID == 'Salt Lake County' ||
                stationID == 'Tooele County' ||
                stationID == 'Uintah County' ||
                stationID == 'Utah County' ||
                stationID == 'Washington County' ||
                stationID == 'Weber County');
    }

    private getChartHeight() {
        let divHeight = angular.element(document).find('#details-plot').css('height');
        return parseInt(divHeight.substring(0, divHeight.length - 2));
    }

    private getDataForPlot(stationID) {
        let self = this;
        self.amsAPIService.asyncGetDataPointsFrom(stationID).then(
            function(response) {
                self.options = self.getChartOptions();
                self.options['height'] = self.getChartHeight();
                self.data = response;
            },
            function(response) {
                self.$log.log('api for device data points failure');
            }
        );
    }

    private getDataForEPAPlot(stationID) {
        let self = this;
        self.amsAPIService.asyncGetDataPointsFromEPA(stationID).then(
            function(response) {
                self.options = self.getChartOptions();
                self.options['height'] = self.getChartHeight();
                self.data = response;
            },
            function(response) {
                self.$log.log('api for EPA device data points failure');
            }
        );
    }

    private getChartOptions() {
        return {
            chart: {
                type: 'stackedAreaChart',
                height: 0,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },
                x: function (d) {
                    return d[0];
                },
                y: function (d) {
                    return d[1];
                },
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    showMaxMin: false,
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d));
                    }
                },
                yAxis: {
                    tickFormat: function (d) {
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };
    }

    private unsetChartData() {
        this.options = undefined;
        this.data = undefined;
    }
}
