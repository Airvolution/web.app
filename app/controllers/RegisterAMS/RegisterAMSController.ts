///<referecnce path="../../typings/tsd.d.ts"/>

import Globals = require("../../Globals");
export = RegisterAMSController;

class RegisterAMSController {

    public static name = "RegisterAMSController";
    public formData = {};
    static $inject = ['$http'];
    constructor(private $http){}

    public formSubmit(){
        this.$http.post(Globals.api_base+'/frontend/registerDevice', this.formData);
    }
}