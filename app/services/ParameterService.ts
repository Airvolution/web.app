///<reference path="../../typings/tsd.d.ts" />

export = ParameterService;

class ParameterService {
    public static serviceName = 'ParameterService';

    private parameters;

    constructor() {

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

    public getParameterList() {
        return this.parameters;
    }
}
