///<referecnce path='../../../../typings/tsd.d.ts'/>

export = RegisterStationController;

class RegisterStationController {

    public formData: any = {};
    public static $inject = ['$http'];
    constructor(private $http) {}

    public formSubmit() {
        let station = {};

        if (this.formData.id === undefined ||
            this.formData.indoor === undefined ||
            this.formData.name === undefined) {
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

        let onError = (error) => { console.log('could not register station') };
        this.$http.post('api/stations/register', station).then((station) => {
            console.log('we have a success');
        });
    }
}
