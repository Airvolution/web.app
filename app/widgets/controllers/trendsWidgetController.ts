/// <reference path="../../../typings/tsd.d.ts" />

export = TrendsWidgetController;

class TrendsWidgetController {
    public static name = "TrendsWidgetController";

    public plotOptions;
    public plotData;
    public then;
    public now;
    public loading;

    public static $inject = ['$scope', 'AQIColors'];

    public constructor(private $scope, private AQIColors) {
        var today = new Date();
        this.now = today.getTime();
        this.then = new Date().setDate(today.getDate() - 45);
        this.plotOptions = {
            chart: {
                type: 'historicalBarChart',
                height: 220,
                margin: {
                    top: 20,
                    right: 50,
                    bottom: 30,
                    left: 50
                },
                x: function (d) {
                    return d.label;
                },
                y: function (d) {
                    return d.value;
                },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format('d')(d);
                },
                duration: 500,
                xAxis: {
                    tickFormat: function (d) {
                        return d3.time.format('%m/%d')(new Date(d));
                    },
                    showMinMax: false
                },
                yAxis: {
                    axisLabel: 'AQI',
                    axisLabelDistance: -15
                },
                xDomain: [this.then, this.now],
                tooltip: {
                    keyFormatter: function (d) {
                        return d3.time.format('%x')(new Date(d));
                    }
                }
            }
        };
        var self = this;
        var unregisterDailies = $scope.$watch('dailies', (val)=> {
            self.getPlotData(val);
        });
        this.plotData = [];
        this.getPlotData($scope.dailies);

        $scope.$on("$destroy", ()=> {
            unregisterDailies();
        });
    }

    public getPlotData(dailies) {
        if (!this.$scope.dailies) {
            this.loading = true;
            return;
        }

        var self = this;
        var tmp = dailies.slice(0, 45);
        while (tmp.length < 45) {
            tmp.push({});
        }
        var data = {
            "key": "AQI",
            values: []
        };
        _.each(tmp, (daily:any)=> {
            var value:any = {};
            if (daily.date) {
                value.label = new Date(daily.date).getTime();
            }
            value.value = daily.maxAQI ? daily.maxAQI : 0;
            value.color = self.AQIColors.getColorFromCategory(daily.maxCategory);
            data.values.push(value);
        });
        self.plotData = [data];
        this.loading = false;
        return;
    }

}
