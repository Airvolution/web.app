///<referecnce path='../../typings/tsd.d.ts'/>

declare let d3;

export = NVD3Controller;
class NVD3Controller {
    public static name = 'NVD3Controller';
    public options;
    public data;

    public static $inject = ['$scope', '$http'];
    constructor(
        private $scope,
        private $http
    ) { }

    public generatePlot() {
        console.log('generating plot');

        let pscope = this.$scope.$parent;

        if (!pscope.station || !pscope.station.id) {
            return;
        }

        this.options = undefined;
        this.data = undefined;

        let url = undefined;
        let obj = undefined;
        let id = pscope.station.id;
        if (id == 'Box Elder County' || id == 'Cache County' || id == 'Price' || id == 'Davis County' || id == 'Duchesne County' || id == 'Salt Lake County' || id == 'Tooele County' || id == 'Uintah County' || id == 'Utah County' || id == 'Washington County' || id == 'Weber County') {
            url = 'api/frontend/daqChart';
        } else {
            url = 'api/frontend/deviceDatapoints';
        }

        obj = JSON.stringify(id);
        console.log('JSON: ' + obj);
        let self = this;
        this.$http({
            url: url,
            data: obj,
            method: 'POST'
            }).then(
            function(response) {
                console.log('Success!');
                console.log('  status: ' + response.status);
                console.log('======================');

                // TODO: look into converting this into an 'ng-style' directive
                // Get the css height of the parent div, strip the 'px' off, parse to Integer
                let divHeight = angular.element(document).find('#details-plot').css('height');
                let plotHeight = parseInt(divHeight.substring(0, divHeight.length - 2));

                self.options = {
                    chart: {
                        type: 'stackedAreaChart',
                        height: plotHeight,
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

                if (url == 'api/frontend/daqChart') {
                    let data = [];
                    for (let index in response.data) {
                        if (response.data[index].values.length > 0) {
                            data.push({ 'key': response.data[index].key, 'values': response.data[index].values });
                        }
                    }
                    self.data = data;
                } else {
                    self.data = response.data;
                }
            },
            function(response) {
                console.log('Failure!');
                console.log('  status: ' + response.status);
                console.log('======================');
            }
        );
    }
}
