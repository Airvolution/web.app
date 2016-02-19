/// <reference path="../../../typings/tsd.d.ts" />

export = ConsecutiveDaysFactory;

class ConsecutiveDaysFactory {
    public static serviceName = 'ConsecutiveDaysFactory';

    public static $inject = ['APIService','$q'];

    constructor(private ApiService,
                private $q) {}

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
}
