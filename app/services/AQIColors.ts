///<reference path="../../typings/tsd.d.ts" />

export = AQIColors;

class AQIColors {
    public static serviceName = 'AQIColors';

    private colors;
    private parameters;

    constructor() {
        this.colors = {
            1: '#00e400', // green  for category 1
            2: '#ffff00', // yellow for category 2
            3: '#ff7e00', // orange for category 3
            4: '#ff0000', // red    for category 4
            5: '#99004c', // purple for category 5
            6: '#7e0023'  // maroon for category 6
        };

        this.parameters = [
                { name: 'PM1.0',       unit: 'UG/M3'  },
                { name: 'PM2.5',       unit: 'UG/M3'  },
                { name: 'PM10',        unit: 'UG/M3'  },
                { name: 'CO',          unit: 'PPM'    },
                { name: 'NO2',         unit: 'PPB'    },
                { name: 'OZONE',       unit: 'PPB'    },
                { name: 'Altitude',    unit: 'M'      },
                { name: 'Humidity',    unit: '%'      },
                { name: 'Temperature', unit: 'C'      },
                { name: 'Pressure',    unit: 'Pascal' }
        ];
    }

    public getColorFromCategory(number) {
        return this.colors[number];
    }

    public getParameterList() {
        return this.parameters;
    }
}
