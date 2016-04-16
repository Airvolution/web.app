///<reference path="../../../typings/tsd.d.ts" />

export = LongestStreaksWidgetController;

class LongestStreaksWidgetController {
    public static name = 'LongestStreaksWidgetController';
    public static $inject = ['ConsecutiveDaysFactory', 'AQIColors'];
    public longestStreaks;
    public plotOptions;
    public plotData;
    public loading;

    constructor(ConsecutiveDaysFactory, private AQIColors) {
        var self = this;

        self.configurePlotOptions();

        ConsecutiveDaysFactory.getLongestStreaks().then((data)=>{
            self.longestStreaks = data;
        });
    }

    public getLongestStreaks() {
        return this.longestStreaks;
    }

    public configurePlotOptions() {
        this.plotOptions = {
            chart: {
                type: "barChart",
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

        for (let i = 0; i < dailies.length; i++) {
            let index = dailies[i]['maxCategory'];
            if (index > 0 && index < 7) {
                categories[index] += 1;
            }
        }

        this.plotData = [
            {
                key: 'Green',
                y: categories[1],
                color: this.AQIColors.getColorFromCategory(1)
            },
            {
                key: 'Yellow',
                y: categories[2],
                color: this.AQIColors.getColorFromCategory(2)
            },
            {
                key: 'Orange',
                y: categories[3],
                color: this.AQIColors.getColorFromCategory(3)
            },
            {
                key: 'Red',
                y: categories[4],
                color: this.AQIColors.getColorFromCategory(4)
            },
            {
                key: 'Purple',
                y: categories[5],
                color: this.AQIColors.getColorFromCategory(5)
            },
            {
                key: 'Maroon',
                y: categories[6],
                color: this.AQIColors.getColorFromCategory(6)
            }
        ];

        this.loading = false;
    }
}
