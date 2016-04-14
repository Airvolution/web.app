///<reference path="../../typings/tsd.d.ts" />

export = AQIColors;

class AQIColors {
    public static serviceName = 'AQIColors';

    constructor() { }

    public getColorFromCategory(category) {
        switch (category) {
            case 1:
                return '#00e400';
            case 2:
                return '#ffff00';
            case 3:
                return '#ff7e00';
            case 4:
                return '#ff0000';
            case 5:
                return '#99004c';
            case 6:
                return '#7e0023';
            default:
                return '#404040';
        }
    }
}
