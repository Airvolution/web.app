/// <reference path="../../../../typings/tsd.d.ts" />

export = CalibrateStationController;

class CalibrateStationController {
    public station;
    public existingAdjustments;
    public newAdjustments;
    public unadjustedParameters;
    public loading;
    public static $inject = ['$scope', '$state','$stateParams','APIService', 'AQIColors'];
    public constructor(
        private $scope,
        private $state,
        private $stateParams,
        private APIService,
        private AQIColors

    ){
        this.loading = true;
        this.newAdjustments = [];
        this.unadjustedParameters = angular.copy(this.AQIColors.getParameterList());

        var self = this;
        this.APIService.getStation($stateParams.id).then((station) => {
            self.station = station;
            self.APIService.getStationAdjustments(station.id).then((adjustments) => {
                self.existingAdjustments = adjustments;
                self.loading = false;
            }, (error) => {
                self.loading = false;
                // TODO: handle error nicely
            });
        });



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

    public deleteFromExistingAdjustments(adjustment) {
        let index = this.existingAdjustments.indexOf(adjustment);
        this.existingAdjustments.splice(index, 1);
    }

    public deleteFromNewAdjustments(adjustment) {
        let index = this.newAdjustments.indexOf(adjustment);
        this.newAdjustments.splice(index, 1);
    }

    public addNewAdjustment() {
        this.newAdjustments.push({
            parameter: this.unadjustedParameters[0],
            scaleFactor: 1.0,
            shiftFactor: 0.0
        });
    }

    public setAdjustmentParameter(adjustment, parameter) {
        adjustment.parameter = parameter;
    }
}
