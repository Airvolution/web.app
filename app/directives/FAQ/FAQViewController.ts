/// <reference path="../../../typings/tsd.d.ts" />

export = FAQViewController;

class FAQViewController {
    public static $inject = ['$scope', '$location', '$anchorScroll'];

    constructor(
        private $scope,
        private $location,
        private $anchorScroll
    ) {
        console.log('FAQController constructor');

        $scope.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        };
    };
}
