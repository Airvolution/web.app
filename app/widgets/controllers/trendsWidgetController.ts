/// <reference path="../../../typings/tsd.d.ts" />

export = TrendsWidgetController;

class TrendsWidgetController {
    public static name = "TrendsWidgetController";

    public plotOptions;
    public plotData;
    public then;
    public now;
    public loading;

    public static $inject = ['$scope'];

    public constructor(private $scope) {
        var today = new Date();
        this.now = today.getTime();
        this.then = new Date().setDate(today.getDate() - 45);
        this.plotOptions = {
            chart: {
                type: 'historicalBarChart',
                height: 220,
                width: 920,
                margin: {
                    top: 30,
                    right: 50,
                    bottom: 30,
                    left: 50
                },
                x: function (d) {
                    return d[0];
                },
                y: function (d) {
                    return d[1];
                },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.1f')(d);
                },
                duration: 100,
                xAxis: {
                    tickFormat: function (d) {
                        return d3.time.format('%m/%d')(new Date(d))
                    }
                },
                xDomain: [this.then, this.now],
                yDomain:[0,200],
                yAxis: {
                    axisLabel: 'AQI',
                    axisLabelDistance: -10,
                    tickFormat: function (d) {
                        return d3.format(',.1f')(d);
                    }
                },
                tooltip: {
                    keyFormatter: function (d) {
                        return d3.time.format('%x')(new Date(d));
                    }
                },
                zoom: {
                    enabled: false
                }
            }
        };
        var self = this;
        var unregisterDailies = $scope.$watch('dailies',(val)=>{
            self.getPlotData(val);
        });

        this.getPlotData($scope.dailies);

        $scope.$on("$destroy",()=>{
            unregisterDailies();
        });
    }

    public getPlotData(dailies) {
        if(!this.$scope.dailies){
            this.loading = true;
            return;
        }
        var tmp = [];
        var self = this;
        _.each(dailies.slice(0,45),(daily:any)=>{
            var timestamp = daily.date ? new Date(daily.date).getTime() : undefined;
            if(timestamp && (timestamp < self.now && timestamp > self.then)){
                tmp.push([timestamp, daily.maxAQI]);
            }else{
                tmp.push([undefined, undefined]);
            }

        });
        this.plotData = [{
            key: "Quantity",
            bar: true,
            values: tmp
        }];
        this.loading = false;
        return;
    }
}