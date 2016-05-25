/// <reference path="../../../typings/tsd.d.ts" />
import FAQQuestionController = require('./FAQQuestionController');
export = FAQQuestionDirective;

class FAQQuestionDirective implements ng.IDirective {
    public static htmlName = 'faqQuestion';

    public restrict = "E";
    public templateUrl = 'app/directives/FAQ/FAQQuestionTemplate.html';
    public controller = FAQQuestionController;
    public controllerAs = 'ctrl';
    public bindToController = true;
    public scope = {
        question: "="
    };

    public static create() {
        return new FAQQuestionDirective();
    }
}
