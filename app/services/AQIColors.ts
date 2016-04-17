///<reference path="../../typings/tsd.d.ts" />

export = AQIColors;

class AQIColors {
    public static serviceName = 'AQIColors';

    private colors;

    constructor() {
        this.colors = {
            1: '#00e400', // green  for category 1
            2: '#ffff00', // yellow for category 2
            3: '#ff7e00', // orange for category 3
            4: '#ff0000', // red    for category 4
            5: '#99004c', // purple for category 5
            6: '#7e0023'  // maroon for category 6
        };
    }

    public getColorFromCategory(number) {
        return this.colors[number];
    }
}
