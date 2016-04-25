/// <reference path="../../../typings/tsd.d.ts" />

export = MonthlyPieChartWidgetController;

class MonthlyPieChartWidgetController {
    public static name = "MontlyPieChartController";

    public plotOptions;
    public plotData;
    public loading;

    public static $inject = ['$scope', '$log', 'AQIService'];

    public constructor(
        private $scope,
        private $log,
        private AQIService
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
        let categories = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        };

        // limits pie chart to 30 days maximum
        for (let i = 0; i < dailies.length && i < 30; i++) {
            let index = dailies[i]['maxCategory'];
            if (index > 0 && index < 7) {
                categories[index] += 1;
            }
        }

        this.plotData = [
            {
                key: 'Green',
                y: categories[1],
                color: this.AQIService.getColorFromCategory(1)
            },
            {
                key: 'Yellow',
                y: categories[2],
                color: this.AQIService.getColorFromCategory(2)
            },
            {
                key: 'Orange',
                y: categories[3],
                color: this.AQIService.getColorFromCategory(3)
            },
            {
                key: 'Red',
                y: categories[4],
                color: this.AQIService.getColorFromCategory(4)
            },
            {
                key: 'Purple',
                y: categories[5],
                color: this.AQIService.getColorFromCategory(5)
            },
            {
                key: 'Maroon',
                y: categories[6],
                color: this.AQIService.getColorFromCategory(6)
            }
        ];

        this.loading = false;
    }
}
