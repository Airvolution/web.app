///<reference path="../../../typings/tsd.d.ts" />
declare var _;
declare var d3;

export = ComparePageController;

class ComparePageController {
    public static name = "ComparePageController";
    static $inject = ['$scope', '$http'];

    public stations = [];
    public plots = [];
    
    constructor(private $scope,
                private $http) {
        var self = this;
        $http({
            url: 'api/frontend/getUserDeviceStates',
            method: 'GET'
        }).then(function(data){
            self.stations = data.data;
        });
    };
    
    public onListChange(id){
        console.log("onListChange(%s)",id);
        var plot = _.find(this.plots,function(p){ return id == p.id});
        if(!!plot){
            plot.visible = !plot.visible;
        }else{
            plot = {id:id,visible:true,data:[]};
            this.generatePlot(plot);
        }
    }
    public generatePlot(plot) {
        console.log('generating plot');
        var self = this;
        var data = JSON.stringify(plot.id);
        this.$http({
            url: 'api/frontend/deviceDatapoints',
            data: data,
            method: 'POST'
            }).then(
            function(response) {
                plot.data = response.data;
                self.plots.push(plot);
            },
            function(response) {
                console.log('Failure!');
            }
        );
    }
    public options = {
        chart: {
            type: 'stackedAreaChart',
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
}