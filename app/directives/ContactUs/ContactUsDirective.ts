/// <reference path="../../../typings/tsd.d.ts" />
import ContactUsController = require('./ContactUsController');
export = ContactUsDirective;

class ContactUsDirective implements ng.IDirective {
    public static htmlName = 'contactUsQuestion';

    public restrict = "E";
    public templateUrl = 'app/directives/contactUs/ContactUsTemplate.html';
    public controller = ContactUsController;
    public controllerAs = 'ctrl';
    public bindToController = true;
    public scope = {
        question: "="
    };

    public static create() {
        return new ContactUsDirective();
    }
}
