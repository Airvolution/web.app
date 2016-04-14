///<reference path="../../typings/tsd.d.ts" />

export = AQIColors;

class AQIColors {
    public static serviceName = 'AQIColors';

    private colors;

    constructor() {
        this.colors = {
            1: '#00e400',
            2: '#ffff00',
            3: '#ff7e00',
            4: '#ff0000',
            5: '#99004c',
            6: '#7e0023'
        }
    }

    public getColorFromCategory(number) {
        return this.colors[number];
    }
}
