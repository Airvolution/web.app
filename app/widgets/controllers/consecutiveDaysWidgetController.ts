///<reference path="../../../typings/tsd.d.ts" />

export = ConsecutiveDaysWidgetController;

class ConsecutiveDaysWidgetController {
    public static name = 'ConsecutiveDaysWidgetController';
    public static $inject = ['ConsecutiveDaysFactory'];
    public consecutiveDays;
    public faEmoji;
    constructor(ConsecutiveDaysFactory) {
        var self = this;
        ConsecutiveDaysFactory.getConsecutiveDays().then((data)=>{
            self.consecutiveDays = data;
            self.getEmoji();
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

    public getEmoji(){
        var category = this.consecutiveDays.category;

        if (category == 'green') {
            this.faEmoji = 'fa-smile-o';
        } else if (category == 'yellow') {
            this.faEmoji = 'fa-meh-o';
        } else {
            this.faEmoji = 'fa-frown-o';
        }
    }
}
