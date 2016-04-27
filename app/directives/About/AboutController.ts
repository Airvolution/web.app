///<reference path='../../../typings/tsd.d.ts'/>

import UserProfile = require('../../models/UserProfile');
export = AboutController;

class AboutController {
    public formData;
    public static $inject = ['APIService'];

    public profiles = [];
    public emailAlert = undefined;

    constructor(private APIService) {
        this.formData = {
            name: undefined,
            email: undefined,
            subject: undefined,
            message: undefined
        };

        // TODO: some Url Links are not working
        // http://stackoverflow.com/questions/15606751/angular-changes-urls-to-unsafe-in-extension-page
        // this link may be the problem
        var jaredP  = new UserProfile('Jared Potter', 'Backend ASP.NET API, Frontend Angular.JS, and 3rd party data gathering.', 'https://www.linkedin.com/in/jared-potter-34138634', 'https://github.com/jaredpotter', 'app/assets/images/profilePictures/jared_potter.png');
        var jaredM  = new UserProfile('Jared Moore', 'Frontend Angular.JS, Search, SQL Database, ASP.NET API, Architecture, Tools, Testing, Deployment', 'https://www.linkedin.com/in/jared-moore-820b2975', 'https://github.com/Jmoore1127', 'app/assets/images/profilePictures/jared_moore.png');
        var taylorW = new UserProfile('Taylor Wilson', 'Frontend Angular.JS, Backend ASP.NET API, and Architecture', 'https://www.linkedin.com/in/t3ilson', 'https://github.com/rolyatwilson', 'app/assets/images/profilePictures/taylor_wilson.png');
        var zachL   = new UserProfile('Zach Lobato', 'Backend ASP.NET API, SQL Server 2012 Database, and 3rd party data gathering.', 'https://www.linkedin.com/in/zachlobato', 'https://github.com/ZachLobato', 'app/assets/images/profilePictures/zach_lobato.png');

        this.profiles = [jaredP, jaredM, taylorW, zachL];
    };

    public sendEmail() {
        if(this.formData.$valid) {
            this.emailAlert = {type: "alert alert-success", message: "Email sent. Thank you."};
            this.formData.$submitted = true;

            this.APIService.PostContactUsEmail(this.formData).then(
                function (response) {
                    console.log("got valid response"+response);
                },
                function (response) {
                    console.error(response);
                }
            );
        }
    };
}
