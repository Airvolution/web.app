///<referecnce path='../../../../typings/tsd.d.ts'/>

export = RegisterStationController;

class RegisterStationController {

    public formData: any = {};
    public alert;
    public alertTimeout;
    public static $inject = ['$http'];
    constructor(private $http) {
        this.formData['indoor'] = true;
    }

    public formSubmit() {
        let station = {};

        if (this.formData.id === undefined ||
            this.formData.indoor === undefined ||
            this.formData.name === undefined) {
            this.alert = {type: 'danger', message: 'We would be happier if you would fill out the form. :)' };
            return;
        }

        station['agency'] = 'Airvolution';
        station['type'] = 'BeagleBone';
        station['id'] = this.formData.id;
        station['name'] = this.formData.name;
        station['indoor'] = this.formData.indoor;

        if (this.formData.purpose !== undefined) {
            station['purpose'] = this.formData.purpose;
        } else {
            station['purpose'] = '';
        }

        let onError = (error) => {
            this.alert = {type: 'danger', message: error.data.message};
        };
        let onSuccess = (response) => {
            let message = 'Awesome! We will now accept data from your device: ' + response.data.name + ".";
            this.alert = {type: 'success', message: message};
        };
        this.$http.post('api/stations/register', station).then(onSuccess, onError);
    }

    public onAlertClose(alert) {
        this.alert = undefined;
    }
}
