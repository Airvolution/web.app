/// <reference path="../../../typings/tsd.d.ts" />

export = AlmanacWidgetController;

class AlmanacWidgetController {
    public type:string;
    public templateUrl:string;
    private templateMap = {
        'consecutive-air-quality-days': "consecutiveAirQualityDays.html",
        '45-day-trend': 'trendsTemplate.html',
        'heatmap': 'heatmapTemplate.html',
        'week-average': 'avgAQI7Days.html',
        'monthly-pie-chart': 'monthlyPieChart.html',
        'longest-streaks' : 'longestStreaks.html',
        'ranking-widget': 'rankingTemplate.html'
    };

    private templateSizeMap = {
        'longest-streaks' : 'large',
        'consecutive-air-quality-days': 'medium',
        '45-day-trend': 'xl',
        'heatmap': 'large',
        'week-average': 'medium',
        'monthly-pie-chart': 'medium',
        'ranking-widget': 'medium'
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
