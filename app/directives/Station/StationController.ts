///<reference path="../../../typings/tsd.d.ts"/>
import Globals = require("../../Globals");
export = StationController;

class StationController {
    public station;
    public collapsed = true;
    public updating = false;

    static $inject = ['$http','$timeout'];

    constructor(private $http:any,
                private $timeout:any) {
    }

    public get hasError() {
        return this.station.hasError;
    }

    public get hasWarning() {
        return this.station.hasWarning && !this.station.hasError;
    }

    public onSubmit() {
        this.$http.put('api/frontend/updateUserDeviceState', this.station);
    }

    public onUpdate(){
        this.updating = true;
        var self = this;
        this.$timeout(()=>{
            self.updating = false;
            var now = new Date();
            var lastUpdated = "Last updated " + (now.getMonth() + 1) + "/" + now.getDate() + "/" + (now.getFullYear() + 1900) + " at " + (now.getHours() % 12 || 12) + ':' + now.getMinutes() + ' ' + (now.getHours() < 12 ? 'am' : 'pm');
            self.station.lastUpdated = lastUpdated;
        },4000);
    }

    public collapse(){
        this.collapsed = !this.collapsed;
    }

}