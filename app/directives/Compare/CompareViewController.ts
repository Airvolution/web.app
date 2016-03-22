///<reference path='../../../typings/tsd.d.ts' />
declare let _;
declare let d3;

export = CompareViewController;

class CompareViewController {
    public static name = 'CompareViewController';
    public static $inject = ['$scope', '$http', '$log', 'selectionService', 'APIService'];

    public stations = [];
    public plots = [];

    public pollutantOptions = [
        {
            kind: 'PM',
            name: 'Particulate Matter',
            checked: false
        },
        {
            kind: 'CO',
            name: 'Carbon Monoxide',
            checked: false
        },
        {
            kind: 'CO2',
            name: 'Carbon Dioxide',
            checked: false
        },
        {
            kind: 'NO2',
            name: 'Nitrogen Dioxide',
            checked: false
        },
        {
            kind: 'O3',
            name: 'Ozone',
            checked: false
        },
    ];

    public weatherOptions = [
        {
            kind: 'Temperature',
            name: 'Temperature',
            checked: false
        },
        {
            kind: 'Humidity',
            name: 'Humidity',
            checked: false
        },
        {
            kind: 'Pressure',
            name: 'Barometric Pressure',
            checked: false
        }
    ];

    public data = [];

    public options = {
        chart: {
            type: 'lineWithFocusChart',
            height: 150,
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

    constructor(
        private $scope,
        private $http,
        private $log,
        private selectionService,
        private APIService
    ) {
        this.stations = this.selectionService.getCurrentStationSelection();
    };

    private plot(dataPoints) {
        let dataToPlot = [];
        let parameters = this.selectionService.getCurrentParameterSelection();
        for (let i = 0; i < dataPoints.length; i++) {
            for (let j = 0; j < dataPoints[i].length; j++) {
                if (parameters.indexOf(dataPoints[i][j]['key']) > -1) {
                    dataToPlot.push(dataPoints[i][j]);
                } else {
                    this.$log.debug('parameter did not match: ' + dataPoints[i][j]['key']);
                }
            }
        }

        if (dataToPlot.length > 0) {
            let plot = { visible: true, data: [] };
            plot.data = dataToPlot;
            this.plots.push(plot);
        }
    }

    public generatePlot() {
        let self = this;
        // TODO: add parameter selection
        // TODO: elimnate for loop with list of station IDs???
        let selected = self.selectionService.getCurrentStationSelection();
        let dataPoints = [];
        for (var index in selected) {
            let url = "api/stations/parameterValues";
            let config = {
                params: {
                    stationID: selected[index],
                    parameter: "PM2.5"
                }
            };
            self.$http.get(url, config).then(
                function (response) {
                    dataPoints.push(response.data);
                    if (dataPoints.length == selected.length) {
                        let plot = { visible: true, data: [] };
                        plot.data = dataPoints;
                        self.plots.push(plot);
                    }
                },
                function (response) {
                }
            );
        }
    }

    public selectPollutant(kind) {
    }

    public selectWeather(kind) {
    }
}
