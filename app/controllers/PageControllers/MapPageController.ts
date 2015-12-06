///<reference path="../../../typings/tsd.d.ts" />

export = MapPageController;

class MapPageController {
    public static name = "MapPageController";
    static $inject = ['$scope'];
    constructor(
        private $scope
    ){
        // TODO: at some point I want to fix the showBounds. I'm not sure why it isn't updating anymore. (Scope issue perhaps)
        $scope.showBounds = false;
    }
    public togglePlot(visibility){        
        console.log('togglePlot called');
                
        if (visibility) {
            this.$scope.plotVisible = !this.$scope.plotVisible;
        }
        
        // pctrl is the parent for mctrl and cctrl
        // we want to call a function in cctrl
        if (this.$scope.plotVisible) {
            this.$scope.$$childTail.cctrl.generatePlot();
        }
    }
}