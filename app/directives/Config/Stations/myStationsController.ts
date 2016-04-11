///<reference path='../../../../typings/tsd.d.ts'/>

// import Globals = require('../../Globals');

export = MyStationsController;

class MyStationsController {
    public static name = 'MyStationsController';
    public stations = [];
    
    public static $inject = [ 'APIService','$log'];
    constructor(private APIService, private $log) {
        this.refreshStations();
    };

    public refreshStations(){
        var self = this;
        this.APIService.getUserStations().then((stations)=>{
            self.stations = stations;
        },(error)=>{
            self.$log.error(error);
        });
    }
}
