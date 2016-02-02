///<reference path='../../../typings/tsd.d.ts' />
declare let _;
declare let d3;

export = ComparePageController;

class ComparePageController {
    public static name = 'ComparePageController';
    public static $inject = ['$scope', '$http', '$log', 'selectionService'];

    public stations = [];
    public plots = [];

    public pollutants = [
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

    public weatherTypes = [
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
        private selectionService
    ) {
        this.selectionService.getCurrentStationSelection();

        let self = this;
        let url = 'api/stations/locators';
        $http.get(url).then(
            function (response) {
                self.stations = response.data.ams;
                self.$log.log('api/frontend/getUserDeviceStates api call succeeded: ' + response);
            },
            function (response) {
                self.$log.log('api/frontend/getUserDeviceStates api call failed: ' + response);
            }
        );
    };

    private plot(dataPoints) {
        this.$log.log('ready to plot points: ' + dataPoints);
        let dataToPlot = [];
        let parameters = this.selectionService.getCurrentParameterSelection();
        for (let i = 0; i < dataPoints.length; i++) {
            this.$log.log('i: ' + i);
            for (let j = 0; j < dataPoints[i].length; j++) {
                this.$log.log('j: ' + j);
                if (parameters.indexOf(dataPoints[i][j]['key']) > -1) {
                    dataToPlot.push(dataPoints[i][j]);
                } else {
                    this.$log.log('parameter did not match: ' + dataPoints[i][j]['key']);
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
        self.$log.log('generating plot for selected stations');
        let selected = self.selectionService.getCurrentStationSelection();
        let dataPoints = [];
        for (var index in selected) {
            self.$log.log('station: ' + selected[index]);
            self.$http({
                url: 'api/frontend/deviceDatapoints',
                data: JSON.stringify(selected[index]),
                method: 'POST'
            }).then(
                function(response) {
                    dataPoints.push(response.data);
                    if (dataPoints.length == selected.length) {
                        self.plot(dataPoints);
                    }
                },
                function(response) {
                    console.log('Failure!');
                }
            );
        }
    }

    public selectPollutant(kind) {
        console.log('is pollutant selected? ' + kind.checked);
    }

    public selectWeather(kind) {
        console.log('is weather selected? ' + kind.checked);
    }
}
