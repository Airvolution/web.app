/// <reference path="../../../typings/tsd.d.ts" />

export = FAQQuestionController;

class FAQQuestionController {
    public question;
    public chev = 'DOWN';

    public static $inject = ['$sanitize'];
    constructor(private $sanitize) {}

    public toggleChevron = function () {
        //var image = angular.element('#img_' + this.question.id);

        if (this.chev == 'DOWN') {
            this.chev = 'UP';
        } else {
            this.chev = 'DOWN';
        }
    };
}
