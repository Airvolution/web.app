///<reference path='../../../typings/tsd.d.ts'/>
// import Globals = require('../../Globals');
export = AQIController;

class AQIController {
    public aqi;
    public category;
    public healthLabel;
    public aqiRange;

    public originalAqi;
    public showRandomAqi;

    public static $inject = ['AQIService'];
    constructor(private AQIService) {
        this.showRandomAqi = false;
    }

    public onAQIUpdate(newAQI) {
        this.aqiRange = ((newAQI % 50) * 2 - 7) + '%';
    }

    public getMeterClass() {
        switch (this.category) {
            case 1:
                return 'aqi-meter-green';
            case 2:
                return 'aqi-meter-yellow';
            case 3:
                return 'aqi-meter-orange';
            case 4:
                return 'aqi-meter-red';
            case 5:
                return 'aqi-meter-purple';
            case 6:
                return 'aqi-meter-maroon';
            default:
                return 'aqi-meter';
        }
    }

    public getCategoryClass() {
        switch (this.category) {
            case 1:
                return 'aqi-green';
            case 2:
                return 'aqi-yellow';
            case 3:
                return 'aqi-orange';
            case 4:
                return 'aqi-red';
            case 5:
                return 'aqi-purple';
            case 6:
                return 'aqi-maroon';
            default:
                return '';
        }
    }

    public getTitle() {
        let article = 'a ';
        let categoryLabel = this.AQIService.getCategoryLabel(this.category);
        if (categoryLabel.startsWith('O') || categoryLabel.startsWith('o')) {
            article = 'an ';
        }
        return "The AQI is " + this.aqi + " for " + article + categoryLabel + " air day. " +
            categoryLabel + " is considered " + this.healthLabel + ". " +
            this.AQIService.getCategoryUpperLimit(this.category) + " is the upper limit for " + categoryLabel + ".";
    }

    public getMeaning() {
        return this.AQIService.getHealthLabelExpandedFromAqi(this.aqi);
    }

    public randomize() {
        if (this.originalAqi === undefined) {
            this.originalAqi = this.aqi;
        }
        let rand = Math.floor(Math.random() * 499);
        this.aqi = rand;
        this.category = this.AQIService.getCategoryFromAqi(this.aqi);
        this.healthLabel = this.AQIService.getHealthLabelFromAqi(this.aqi);
    }

    public reset() {
        if (this.originalAqi !== undefined) {
            this.aqi = this.originalAqi;
        }
    }

}
