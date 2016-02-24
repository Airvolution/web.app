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

    public getConsecutiveDays(category){
        if(this.consecutiveDays && this.consecutiveDays.category == category){
            return this.consecutiveDays.count;
        }else{
            return 0;
        }
    }
}
