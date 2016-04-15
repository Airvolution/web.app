///<reference path="../../typings/tsd.d.ts" />

export = AQIColors;

class AQIColors {
    public static serviceName = 'AQIColors';

    private colors;
    private parameters;

    constructor() {
        this.colors = {
            1: '#00e400',
            2: '#ffff00',
            3: '#ff7e00',
            4: '#ff0000',
            5: '#99004c',
            6: '#7e0023'
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
