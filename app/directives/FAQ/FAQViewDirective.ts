/// <reference path="../../../typings/tsd.d.ts" />
import FAQViewController = require('./FAQViewController');
export = FAQViewDirective;

class FAQViewDirective implements ng.IDirective {
    public static htmlName = 'faqView';

    public restrict = "E";
    public templateUrl = 'app/directives/FAQ/FAQViewTemplate.html';
    public controller = FAQViewController;
    public controllerAs = 'ctrl';
    public bindToController = true;

    public static create() {
        return new FAQViewDirective();
    }
}
