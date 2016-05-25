/// <reference path="../../../typings/tsd.d.ts" />

export = ConsecutiveDaysFactory;

class ConsecutiveDaysFactory {
    public static serviceName = 'ConsecutiveDaysFactory';

    public static $inject = ['APIService','$q'];

    constructor(private ApiService,
                private $q) {}

    public getLongestStreaks() {
        var deferred = this.$q.defer();
        var self = this;
        var longestGreenStreak = 0;
        var longestYellowStreak = 0;
        var longestOrangeStreak = 0;
        var longestRedStreak = 0;
        var longestPurpleStreak = 0;
        var longestMaroonStreak = 0;
        this.ApiService.getDailies(365).then((values)=>{

            longestGreenStreak  = this.getLongestStreakForCategory(1, values);
            longestYellowStreak = this.getLongestStreakForCategory(2, values);
            longestOrangeStreak = this.getLongestStreakForCategory(3, values);
            longestRedStreak    = this.getLongestStreakForCategory(4, values);
            longestPurpleStreak = this.getLongestStreakForCategory(5, values);
            longestMaroonStreak = this.getLongestStreakForCategory(6, values);

            deferred.resolve({
                longestGreen:  longestGreenStreak,
                longestYellow: longestYellowStreak,
                longestOrange: longestOrangeStreak,
                longestRed:    longestRedStreak,
                longestPurple: longestPurpleStreak,
                longestMaroon: longestMaroonStreak
            });
        },(error)=>{deferred.reject(error);});
        return deferred.promise;
    }

    public getConsecutiveDays() {
        var deferred = this.$q.defer();
        var self = this;
        this.ApiService.getDailies(31).then((values)=>{
            var count = 0;
            var category = values[0].maxCategory;
            for (count; count < values.length; count++) {
                var value = values[count];
                if (value.maxCategory != category) {
                    break;
                }
            }
            deferred.resolve({
                category: self.getCategoryName(category),
                count: count
            });
        },(error)=>{deferred.reject(error);});
        return deferred.promise;
    }

    private getCategoryName(categoryNumber) {
        switch (categoryNumber) {
            case 1:
                return 'green';
            case 2:
                return 'yellow';
            case 3:
                return 'orange';
            case 4:
                return 'red';
            case 5:
                return 'purple';
            case 6:
                return 'maroon';
            default:
                return 'unknown';
        }
    }

    private getLongestStreakForCategory(category, values) {
        var count = 0;
        var currentStreakCount = 0;
        var longestStreak = 0;
        for (count; count < values.length; count++) {
            var value = values[count];
            if (value.maxCategory == category) {
                currentStreakCount++;
            } else {
                if(currentStreakCount > longestStreak) {
                    // Save longest streak so far.
                    longestStreak = currentStreakCount;
                }

                // Reset current count to 0.
                currentStreakCount = 0;
            }
        }

        return longestStreak;
    }
}
