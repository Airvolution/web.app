/// <reference path="../../../typings/tsd.d.ts" />

export = FAQViewController;

class FAQViewController {

    public faqList;
    public top5Viewed;
    public top5Rated;
    public faqDict = {};
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
        //if($stateParams.id) {
        //    var prefix = 'section';
        //    this.scrollTo(prefix+$stateParams.id);
        //}

        this.getFAQs();
        this.getTop5Lists();
    };

    public scrollTo(id, prefix) {

        if(prefix == 'question') {
            $('html, body').animate({
                scrollTop: $('#' + prefix + id).offset().top
            }, 1000);

            // Check if question is collapsed.
            if(!angular.element('#answer' + id).hasClass('in')) {
                for(var i = 0; i < this.faqList.length; i++) {
                    if(this.faqList[i].id == id) {
                        this.faqList[i].chevron = 'UP';
                        break;
                    }
                }

                // Increment view count.
                this.APIService.PostFaqViewCount(id).then(()=>{
                }, (error) => {
                });
            }
        }
        else {

        }
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
    };

    public onSearchSelect(result){
        this.searchResults = undefined;
        this.resultsCount = 0;
        this.scrollTo(result._id, "question");
        this.resultsVisible = false;
        this.search = '';
    };

    public getTop5Lists() {
        this.top5Viewed = this.APIService.GetTop5MostViewedList().then((top5viewed)=>{
            this.top5Viewed = top5viewed;
        });

        this.top5Rated = this.APIService.GetTop5HighestRatedList().then((top5Rated)=>{
            this.top5Rated = top5Rated;
        });
    }
}