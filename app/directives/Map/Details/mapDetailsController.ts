/// <reference path="../../../../typings/tsd.d.ts" />

export = MapDetailsController;

class MapDetailsController {
    public visible;
    public data;
    public loading;
    public type;
    public template;

    public templateMap = {
        'station': 'station.html',
        'group': 'group.html'
    };
    public static $inject = ['$scope'];
    constructor(private $scope) {
        this.updateTemplate();
        var self = this;
        var unregister = $scope.$watch('ctrl.type',(val)=>{
            self.updateTemplate(val);
        });
        $scope.$on('$destroy',()=>{
            unregister();
        });
    }

    public updateTemplate(type?:string){
        var templatePrefix = 'app/directives/Map/Details/templates/';
        if(!this.templateMap[type]){
            this.template = templatePrefix + this.templateMap['station'];
            return;
        }
        this.template = templatePrefix + this.templateMap[type];
        return;
    }
}
