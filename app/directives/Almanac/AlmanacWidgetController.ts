/// <reference path="../../../typings/tsd.d.ts" />

export = AlmanacWidgetController;

class AlmanacWidgetController {
    public type:string;
    public templateUrl:string;
    private templateMap = {
        'consecutive-green-days': "consecutiveGreenDays.html",
        'consecutive-red-days': "consecutiveRedDays.html",
        'consecutive-yellow-days': "consecutiveYellowDays.html",
        '45-day-trend': 'trendsTemplate.html',
        'week-average': 'avgAQI7Days.html'
    };

    private templateSizeMap = {
        'consecutive-green-days': 'medium',
        'consecutive-red-days': 'medium',
        'consecutive-yellow-days': 'medium',
        '45-day-trend': 'xl',
        'week-average': 'medium'
    };

    public static $inject = ['$scope'];

    constructor(private $scope) {
        var self = this;
        var deregister = $scope.$watch('ctrl.type', (oldVal, newVal)=> {
            self.templateUrl = self.getTemplateLocation(newVal);
            if (newVal != '') {
                deregister();
            }
        });
        var unregisterDailies = $scope.$watch('ctrl.dailies',(val)=>{
            $scope.dailies = val;
        });

        $scope.$on("$destroy",()=>{
            unregisterDailies();
        });

    }

    private getTemplateLocation(type) {
        var prefix = 'app/widgets/templates/';
        if(this.templateMap[type]){
            return prefix + this.templateMap[type];
        } else {
            return prefix + 'widgetNotFound.html';
        }
    }
    public getTemplateSize(type) {
        if(this.templateSizeMap[type]){
            return this.templateSizeMap[type];
        } else {
            return 'small';
        }
    }
}
