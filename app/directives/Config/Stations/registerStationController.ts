///<referecnce path='../../../../typings/tsd.d.ts'/>

export = RegisterStationController;

class RegisterStationController {

    public formData: any = {};
    public static $inject = ['$http'];
    constructor(private $http) {}

    public formSubmit() {
        if (!this.formData.owner) {
            this.formData.owner = '';
        }
        if (!this.formData.purpose) {
            this.formData.purpose = '';
        }
        if (!this.formData.location) {
            this.formData.location = {lat: 0, lng: 0};
        }
        if (this.formData.id == undefined || this.formData.private == undefined || this.formData.indoor == undefined) {
            return;
        }
        this.$http.post('api/stations/register', this.formData);
    }
}
