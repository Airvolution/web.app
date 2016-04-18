/// <reference path="../../../typings/tsd.d.ts" />
import AboutController = require('./AboutController');
export = AboutDirective;

class AboutDirective implements ng.IDirective {
    public static htmlName = 'about';

    public restrict = "E";
    public templateUrl = 'app/directives/About/AboutTemplate.html';
    public controller = AboutController;
    public controllerAs = 'ctrl';
    public bindToController = true;

    public static create() {
        return new AboutDirective();
    }
}
