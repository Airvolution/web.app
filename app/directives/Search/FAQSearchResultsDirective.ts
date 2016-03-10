/// <reference path="../../../typings/tsd.d.ts" />
import FAQSearchResultsController = require('./FAQSearchResultsController');
export = FAQSearchResultsDirective;

class FAQSearchResultsDirective implements ng.IDirective {
    public static htmlName = 'faqSearchResults';

    public restrict = 'E';
    public templateUrl = 'app/directives/Search/FAQSearchResultsTemplate.html';
    public controller = FAQSearchResultsController;
    public controllerAs = "ctrl";
    public bindToController = true;
    public scope = {
        searchResults: '=',
        totalResults: '=',
        onResultClick: '&'
    };

    public static create() {
        return new FAQSearchResultsDirective();
    }
}
