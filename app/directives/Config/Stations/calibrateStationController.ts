/// <reference path="../../../../typings/tsd.d.ts" />

export = CalibrateStationController;

class CalibrateStationController {
    public station;
    public existingAdjustments;
    public newAdjustments;
    public static $inject = ['$state','$stateParams','APIService','$scope'];
    public constructor(
        private $state,
        private $stateParams,
        private APIService,
        private $scope
    ){
        var self = this;
        this.APIService.getStation($stateParams.id).then((station) => {
            self.station = station;
            self.APIService.getStationAdjustments(station.id).then((adjustments) => {
                self.existingAdjustments = adjustments;
            });
        });

        this.newAdjustments = [];

        $scope.configureModal('Calibrate Station '+$stateParams.id,
            "Save",
            ()=> {
                //TODO Save adjustments here
                $scope.closeModal();
            },
            "Cancel",
            ()=> {
                $scope.closeModal();
            });

        //TODO Load Adjustment params here
        console.log("Calibrating station "+$stateParams.id);
    }
}
