/// <reference path="../../../typings/tsd.d.ts" />

export = MonthlyPieChartWidgetController;

class MonthlyPieChartWidgetController {
    public static name = "MontlyPieChartController";

    public plotOptions;
    public plotData;
    public loading;

    public static $inject = ['$scope', '$log'];

    public constructor(
        private $scope,
        private $log
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
                width: 220,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                },
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
                color: '#00e400'
            },
            {
                key: 'Yellow',
                y: yellow,
                color: '#ffff00'
            },
            {
                key: 'Orange',
                y: orange,
                color: 'ff7e00'
            },
            {
                key: 'Red',
                y: red,
                color: '#ff0000'
            },
            {
                key: 'Purple',
                y: purple,
                color: '#99004c'
            },
            {
                key: 'Maroon',
                y: maroon,
                color: '#7e0023'
            }
        ];

        //this.plotData = [
        //    {
        //        key: "One",
        //        y: 5,
        //        color: "#8c564b"
        //    },
        //    {
        //        key: "Two",
        //        y: 2,
        //        color: "#e377c2"
        //    },
        //    {
        //        key: "Three",
        //        y: 9
        //    },
        //    {
        //        key: "Four",
        //        y: 7
        //    },
        //    {
        //        key: "Five",
        //        y: 4
        //    },
        //    {
        //        key: "Six",
        //        y: 3
        //    },
        //    {
        //        key: "Seven",
        //        y: .5
        //    }
        //];

        this.loading = false;
    }

}