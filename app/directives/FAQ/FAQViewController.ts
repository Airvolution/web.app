/// <reference path="../../../typings/tsd.d.ts" />

export = FAQViewController;

class FAQViewController {

    public faqList;
    public search;
    public resultsVisible;
    public searchResults;
    public resultsCount;
    public scrollPos;
    public static $inject = ['$timeout','$stateParams', '$scope', 'APIService', '$q','SearchService'];

    constructor(private $timeout,
                private $stateParams,
                private $scope,
                private APIService,
                private $q,
                private SearchService) {
        if($stateParams.id){
            var prefix = 'section';
            this.scrollTo(prefix+$stateParams.id);
        }

        this.getFAQs();
    };

    public scrollTo(id) {
        this.scrollPos = id;
        var self = this;
        this.$timeout(()=> {
            self.scrollPos = undefined;
        }, 250);
    };

    public getFAQs() {
        var self = this;
        this.APIService.GetFAQs().then(
            function (response) {
                // Add content to page.
                self.faqList = response;
            },
            function (response) {
                //display an error here... if we want
            }
        );
    };

    public onSearchChange(){
        var self = this;
        this.SearchService.searchFAQs(this.search).then((results)=>{
            self.searchResults = results.hits;
            self.resultsCount = results.total;
        });
    }

    public onSearchSelect(result){
        this.searchResults = undefined;
        this.resultsCount = 0;
        this.scrollTo('question'+result._id);
        this.resultsVisible = false;
        this.search = '';
    }
}
