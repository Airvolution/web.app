///<reference path='../../../typings/tsd.d.ts'/>
import Globals = require('../../Globals');
export = AQIController;

class AQIController {
    public aqi;
    public category;
    public aqiRange;

    constructor() {
    };

    public onAQIUpdate(newAQI) {
        this.aqiRange = ((newAQI % 50) * 2 - 7) + '%';
    }
    public getMeterClass() {
        switch (this.category) {
            case 'Good':
                return 'aqi-meter-low';
            case 'Moderate':
                return 'aqi-meter-med';
            default:
                return 'aqi-meter-high';
        }
    }
    public getCategoryClass() {
        switch (this.category) {
            case 'Good':
                return 'aqi-good';
            case 'Moderate':
                return 'aqi-med';
            default:
                return 'aqi-high';
        }
    }

    public tryMe() {
        let rand = Math.floor(Math.random() * 149);
        this.aqi = rand;
        if (rand < 50) {
            this.category = 'Good';
        } else if (rand < 100) {
            this.category = 'Moderate';
        } else {
            this.category = 'Hold your breath...';
        }
    }

}
