///<reference path="../../typings/tsd.d.ts" />

export = AQIService;

class AQIService {
    public static serviceName = 'AQIService';

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

    public getCategoryFromAqi(aqi) {
        if (aqi < 0) {
            return 1;
        } else if (aqi <= 50) {
            return 1;
        } else if (aqi <= 100) {
            return 2;
        } else if (aqi <= 150) {
            return 3;
        } else if (aqi <= 200) {
            return 4;
        } else if (aqi <= 300) {
            return 5;
        } else {
            return 6;
        }
    }

    public getCategoryUpperLimit(category) {
        switch (category) {
            case 1:
                return 50;
            case 2:
                return 100;
            case 3:
                return 150;
            case 4:
                return 200;
            case 5:
                return 300;
            case 6:
                return 500;
            default:
                return -1;
        }
    }

    public getCategoryLabel(category) {
        switch (category) {
            case 1:
                return 'Green';
            case 2:
                return 'Yellow';
            case 3:
                return 'Orange';
            case 4:
                return 'Red';
            case 5:
                return 'Purple';
            case 6:
                return 'Maroon';
            default:
                return '';
        }
    }

    public getHealthLabelFromAqi(aqi) {
        if (aqi < 0) {
            return '';
        } else if (aqi <= 50) {
            return 'Good';
        } else if (aqi <= 100) {
            return 'Moderate';
        } else if (aqi <= 150) {
            return 'Unhealthy for Sensitive Groups';
        } else if (aqi <= 200) {
            return 'Unhealthy';
        } else if (aqi <= 300) {
            return 'Very Unhealthy';
        } else {
            return 'Hazardous';
        }
    }
}
