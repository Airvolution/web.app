///<reference path='../../../typings/tsd.d.ts' />

export = MapPageController;

class MapPageController {
    public static name = 'MapPageController';
    public static $inject = ['$scope'];
    constructor(
        private $scope
    ) {
        $scope.showBounds = true;
    }

    public togglePlot(visibility) {
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
