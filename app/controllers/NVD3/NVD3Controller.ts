///<referecnce path="../../typings/tsd.d.ts"/>

declare var d3;

export = NVD3Controller;
class NVD3Controller {
    public static name = "NVD3Controller";
    public options;
    public data;

    static $inject = ['$scope', '$http'];
    constructor(
        private $scope,
        private $http
    ) { }

    public generatePlot() {
        console.log('generating plot');
        
        var pscope = this.$scope.$parent;
        
        if (!pscope.station || !pscope.station.id) {
            return;
        }

        var url = 'api/frontend/deviceDatapoints'
        var obj = JSON.stringify(pscope.station.id);
        console.log('JSON: ' + obj);
        var self = this;
        this.$http({
            url:url,
            data:obj,
            method: 'POST'
            }).then(
            function(response) {
                console.log('Success!');
                console.log('  status: ' + response.status);
                console.log('======================');

                self.options = {
                    chart: {
                        type: 'stackedAreaChart',
                        height: 450,
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
                self.data = response.data;
            },
            function(response) {
                console.log('Failure!');
                console.log('  status: ' + response.status);
                console.log('======================');
            }
        );
    }
}
