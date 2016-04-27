///<reference path='../../../typings/tsd.d.ts'/>

import UserProfile = require('../../models/UserProfile');
export = AboutController;

class AboutController {
    public formData;
    public static $inject = ['APIService'];

    public profiles = [];
    public alert;
    public alertTimeout;

    constructor(private APIService) {
        this.formData = {
            name: undefined,
            email: undefined,
            subject: undefined,
            message: undefined
        };

        var jaredP  = new UserProfile(
            'Jared Potter',
            'Backend ASP.NET API, Frontend Angular.JS, and 3rd party data gathering.',
            'https://www.linkedin.com/in/jared-potter-34138634',
            'https://github.com/jaredpotter',
            'app/assets/images/profilePictures/jared_potter.png');
        var jaredM  = new UserProfile('Jared Moore',
            'Frontend Angular.JS, Search, SQL Database, ASP.NET API, Architecture, Tools, Testing, Deployment',
            'https://www.linkedin.com/in/jared-moore-820b2975',
            'https://github.com/Jmoore1127',
            'app/assets/images/profilePictures/jared_moore.png');
        var taylorW = new UserProfile('Taylor Wilson',
            'Frontend Angular.JS, Backend ASP.NET API, and Architecture',
            'https://www.linkedin.com/in/t3ilson',
            'https://github.com/rolyatwilson',
            'app/assets/images/profilePictures/taylor_wilson.png');
        var zachL   = new UserProfile('Zach Lobato',
            'Backend ASP.NET API, SQL Server 2012 Database, and 3rd party data gathering.',
            'https://www.linkedin.com/in/zachlobato',
            'https://github.com/ZachLobato',
            'app/assets/images/profilePictures/zach_lobato.png');

        this.profiles = [jaredP, jaredM, taylorW, zachL];
    };

    public sendEmail() {
        let self = this;
        if (self.formData.name && self.formData.email && self.formData.subject && self.formData.message) {
            self.formData.$submitted = true;
            self.APIService.PostContactUsEmail(self.formData).then(
                function () {
                    self.alert = {
                        type: "alert alert-success",
                        message: "Yay! We love hearing from our users!"
                    };
                },
                function () {
                    self.alert = {
                        type: "alert alert-error",
                        message: "We're sorry. Something went wrong. Please try again and again and again."
                    };
                }
            );
        }
    };

    public onAlertClose(alert) {
        this.alert = undefined;
    }
}
