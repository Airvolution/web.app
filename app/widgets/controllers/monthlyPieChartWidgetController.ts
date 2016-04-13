/// <reference path="../../../typings/tsd.d.ts" />

export = MonthlyPieChartWidgetController;

class MonthlyPieChartWidgetController {
    public static name = "MontlyPieChartController";

    public plotOptions;
    public plotData;
    public loading;

    public static $inject = ['$scope', '$log', 'AQIColors'];

    public constructor(
        private $scope,
        private $log,
        private AQIColors
    ) {
        this.$log.log('MonthlyPieChartController: constructor called');
        let self = this;
        self.configurePlotOptions();

        let unregisterDailies = $scope.$watch('dailies', (dailies) => {
            self.getPlotData(dailies);
        });

        $scope.$on("$destroy", () => {
            unregisterDailies();
        });
    }

    public configurePlotOptions() {
        this.plotOptions = {
            chart: {
                type: "pieChart",
                height: 220,
                width: 280,
                duration: 500,
                legend: {
                    margin: {
                        top: 8,
                        right: 5,
                        bottom: 0,
                        left: 0
                    }
                },
                showLabels: false,
                color: [],
                x: (d) => { return d.key; },
                y: (d) => { return d.y; }
            }
        };
    }

    public getPlotData(dailies) {
        let self = this;
        if (!dailies) {
            self.loading = true;
            return;
        }

        // count the number of max categories in dailies
        let green  = 0;
        let yellow = 0;
        let orange = 0;
        let red    = 0;
        let purple = 0;
        let maroon = 0;

        angular.forEach(dailies, (daily) => {
            switch (daily['maxCategory']) {
                case 1:
                    green += 1;
                    break;
                case 2:
                    yellow += 1;
                    break;
                case 3:
                    orange += 1;
                    break;
                case 4:
                    red += 1;
                    break;
                case 5:
                    purple += 1;
                    break;
                case 6:
                    maroon += 1;
                    break;
                default:
                    break;
            }
        });

        this.plotData = [
            {
                key: 'Green',
                y: green,
                color: this.AQIColors.getColorFromCategory(1)
            },
            {
                key: 'Yellow',
                y: yellow,
                color: this.AQIColors.getColorFromCategory(2)
            },
            {
                key: 'Orange',
                y: orange,
                color: this.AQIColors.getColorFromCategory(3)
            },
            {
                key: 'Red',
                y: red,
                color: this.AQIColors.getColorFromCategory(4)
            },
            {
                key: 'Purple',
                y: purple,
                color: this.AQIColors.getColorFromCategory(5)
            },
            {
                key: 'Maroon',
                y: maroon,
                color: this.AQIColors.getColorFromCategory(6)
            }
        ];

        this.loading = false;
    }

}