///<reference path="../../../typings/tsd.d.ts" />

export = LongestStreaksWidgetController;

class LongestStreaksWidgetController {
    public static name = 'LongestStreaksWidgetController';
    public static $inject = ['ConsecutiveDaysFactory', 'AQIService', '$scope'];
    public longestStreaks;
    public plotOptions;
    public plotData;
    public loading;

    constructor(ConsecutiveDaysFactory, private AQIService, private $scope) {
        var self = this;

        self.configurePlotOptions();

        ConsecutiveDaysFactory.getLongestStreaks().then((data)=>{
            self.longestStreaks = data;

            self.getPlotData(self.longestStreaks);
        });
    }

    public getLongestStreaks() {
        return this.longestStreaks;
    }

    public configurePlotOptions() {
        this.plotOptions = {
            chart: {
                type: "discreteBarChart",
                height: 220,
                width: 600,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 60
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format('.0f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'AQI Categories'
                },
                yAxis: {
                    axisLabel: 'Longest Streak in Days',
                    tickFormat: d3.format(',.0d')
                },
                color: []
            }
        };
    }

    public getPlotData(longestStreaks) {
        let self = this;
        if (!longestStreaks) {
            self.loading = true;
            return;
        }

        this.plotData = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        label: 'Green',
                        value: longestStreaks.longestGreen,
                        color: this.AQIService.getColorFromCategory(1)
                    },
                    {
                        label: 'Yellow',
                        value: longestStreaks.longestYellow,
                        color: this.AQIService.getColorFromCategory(2)
                    },
                    {
                        label: 'Orange',
                        value: longestStreaks.longestOrange,
                        color: this.AQIService.getColorFromCategory(3)
                    },
                    {
                        label: 'Red',
                        value: longestStreaks.longestRed,
                        color: this.AQIService.getColorFromCategory(4)
                    },
                    {
                        label: 'Purple',
                        value: longestStreaks.longestPurple,
                        color: this.AQIService.getColorFromCategory(5)
                    },
                    {
                        label: 'Maroon',
                        value: longestStreaks.longestMaroon,
                        color: this.AQIService.getColorFromCategory(6)
                    }
                ]
            }
        ];

        this.loading = false;
    }
}
