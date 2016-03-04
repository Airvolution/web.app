///<reference path='../../../typings/tsd.d.ts'/>

export = FAQController;

class FAQController {
    public static name = 'FAQController';
    public static $inject = ['$scope', '$location', '$anchorScroll', 'APIService', '$q'];

    public faqs;

    constructor(
        private $scope,
        private $location,
        private $anchorScroll,
        private APIService,
        private $q
    ) {
        console.log('FAQController constructor');

        //this.faqs = this.getFAQs();
        this.getFAQs();

        $scope.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        };

        //let result = this.getFAQs();
        console.log("");
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
};

