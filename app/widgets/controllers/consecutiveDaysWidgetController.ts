///<reference path="../../../typings/tsd.d.ts" />

export = ConsecutiveDaysWidgetController;

class ConsecutiveDaysWidgetController {
    public static name = 'ConsecutiveDaysWidgetController';
    public static $inject = ['ConsecutiveDaysFactory'];
    public consecutiveDays;
    constructor(ConsecutiveDaysFactory) {
        var self = this;
        ConsecutiveDaysFactory.getConsecutiveDays().then((data)=>{
            self.consecutiveDays = data;
        });
    }

    public getConsecutiveDays(){
        if(this.consecutiveDays){
            return this.consecutiveDays.count;
        }
    }

    public capitalizeFirst(input){
        if (input != null){
            input = input.toLowerCase();
            return input.substring(0,1).toUpperCase()+input.substring(1);
        }
    }
}
