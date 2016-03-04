/// <reference path="../../../typings/tsd.d.ts" />

export = FAQViewController;

class FAQViewController {

    public faqList;
    public self;
    public scrollPos;
    public static $inject = ['$timeout','$stateParams', '$scope', 'APIService', '$q'];

    constructor(private $timeout,
                private $stateParams,
                private $scope,
                private APIService,
                private $q) {
        if($stateParams.id){
            var prefix = 'section';
            this.scrollTo(prefix+$stateParams.id);
        }

        let self = this;
        this.getFAQs(self);
    };

    public scrollTo(id) {
        this.scrollPos = id;
        var self = this;
        this.$timeout(()=> {
            self.scrollPos = undefined;
        }, 250);
    };

    public getFAQs(self) {
        var deferred = self.$q.defer();
        self.APIService.GetFAQs().then(
            function (response) {
                deferred.resolve(response);

                // Add content to page.
                self.faqList = response;
            },
            function (response) {
                deferred.reject(response);
            }
        );
        return deferred.promise;
    };
};
