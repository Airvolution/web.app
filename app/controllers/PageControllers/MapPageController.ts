///<reference path="../../../typings/tsd.d.ts" />

export = MapPageController;

class MapPageController {
    public static name = "MapPageController";
    static $inject = ['$scope'];
    constructor(
        private $scope
    ){}
    public togglePlot(){
        this.$scope.plotVisible = !this.$scope.plotVisible;
        console.log('togglePlot called');
        
        // pctrl is the parent for mctrl and cctrl
        // we want to call a function in cctrl
        this.$scope.$$childTail.cctrl.generatePlot();
    }
}