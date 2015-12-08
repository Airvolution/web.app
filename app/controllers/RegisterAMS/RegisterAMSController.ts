///<referecnce path="../../typings/tsd.d.ts"/>

import Globals = require("../../Globals");
export = RegisterAMSController;

class RegisterAMSController {

    public static name = "RegisterAMSController";
    public formData:any = {};
    static $inject = ['$http'];
    constructor(private $http){}

    public formSubmit(){
        if(!this.formData.owner)
            this.formData.owner = '';
        if(!this.formData.location)
            this.formData.location = {lat:'',lng:''};
        if(this.formData.id == undefined || this.formData.private == undefined || this.formData.indoor == undefined)
            return;
        this.$http.post('/api/frontend/registerDevice', this.formData);
    }
}