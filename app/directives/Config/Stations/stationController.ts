///<reference path='../../../../typings/tsd.d.ts'/>
export = StationController;

class StationController {
    public station;
    public formStation;
    public collapsed = true;
    public updating = false;
    public updateForm;

    public static $inject = ['$scope','APIService','$state'];

    constructor(private $scope, private APIService, private $state) {
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
        this.APIService.updateStation(this.formStation).then((station)=>{
            self.station = station;
            this.updating = false;
        });

    }

    public calibrate(){
        this.$state.go('modal.calibrate',{id:this.station.id});
    }

}
