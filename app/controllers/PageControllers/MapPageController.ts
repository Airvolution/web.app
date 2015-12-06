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
    }
}