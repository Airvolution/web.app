/// <reference path="../../../typings/tsd.d.ts" />

export = FAQViewController;

class FAQViewController {

    public scrollPos;
    public static $inject = ['$timeout','$stateParams'];

    constructor(private $timeout,$stateParams) {
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
        var deferred = this.$q.defer();
        let self = this;
        self.APIService.GetFAQs().then(
            function (response) {
                deferred.resolve(response);
                // Add content to page.
                console.log("we made it here");
                self.faqs = response;
            },
            function (response) {
                deferred.reject(response);
            }
        );
        return deferred.promise;
    }
}