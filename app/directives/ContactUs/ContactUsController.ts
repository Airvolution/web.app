///<reference path='../../../typings/tsd.d.ts'/>

import Email = require('../../models/Email');
export = ContactUsController;

class ContactUsController {
    public static htmlName = 'ContactUsController';
    public static $inject = ['APIService'];

    constructor(private APIService) { };

    public SendEmail = function () {
        var self = this;

        var email = new Email(angular.element('#name'), angular.element('#emailAddress'), angular.element('#subject'), angular.element('#message'));

        self.console.log(email);


    };
};
