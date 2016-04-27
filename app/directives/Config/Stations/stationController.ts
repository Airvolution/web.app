///<reference path='../../../../typings/tsd.d.ts'/>
export = StationController;

class StationController {
    public alert;
    public alertTimeout;
    public station;
    public formStation;
    public collapsed = true;
    public updating = false;
    public updateForm;

    public static $inject = ['$scope','APIService','$state'];

    constructor(private $scope, private APIService, private $state) {
        this.alertTimeout = 2000;
        var self = this;
        var unregister = $scope.$watch('ctrl.station',(newVal)=>{
            self.formStation = angular.copy(self.station);
        });

        $scope.$on('$destroy',()=>{
            unregister();
        });
    }

    public get hasError() {
        return this.station.hasError;
    }

    public get hasWarning() {
        return this.station.hasWarning && !this.station.hasError;
    }

    public collapse() {
        this.collapsed = !this.collapsed;
    }

    public onUpdate(){
        this.updating = true;
        var self = this;
        this.APIService.getStation(this.station.id).then((station)=>{
            self.station = station;
            this.updating = false;
        });
    }

    public onSubmit(){
        this.updating = true;
        var self = this;

        let onSuccess = (station) => {
            self.station = station;
            this.updating = false;
            let message = 'Great news! We saved your changes. Have a nice day!';
            this.alert = {type: 'success', message: message};
        };

        let onError = (reaponse) => {
            let message = 'Hmmm. This almost never happens. Please try again.';
            this.alert = {type: 'success', message: message};
        };

        this.APIService.updateStation(this.formStation).then(onSuccess, onError);

    }

    public calibrate(){
        this.$state.go('modal.calibrate',{id:this.station.id});
    }

    public onAlertClose(alert) {
        this.alert = undefined;
    }
}
