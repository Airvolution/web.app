/// <reference path="../../../typings/tsd.d.ts" />

export = AlmanacWidgetController;

class AlmanacWidgetController {
    public type:string;
    public templateUrl:string;
    private templateMap = {
        'avg-aqi-7-days': "avgAQI7Days.html",
        'consecutive-green-days': "consecutiveGreenDays.html",
        'consecutive-red-days': "consecutiveRedDays.html",
        'consecutive-yellow-days': "consecutiveYellowDays.html",
    };

    private templateSizeMap = {
        'avg-aqi-7-days': 'medium',
        'consecutive-green-days': 'medium',
        'consecutive-red-days': 'medium',
        'consecutive-yellow-days': 'medium'
    };

    public static $inject = ['$scope'];

    constructor($scope) {
        var self = this;
        var deregister = $scope.$watch('ctrl.type', (oldVal, newVal)=> {
            self.templateUrl = self.getTemplateLocation(newVal);
            if (newVal != '') {
                deregister();
            }
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
