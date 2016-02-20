///<reference path='../../../typings/tsd.d.ts'/>

export = FAQController;

class FAQController {
    public static name = 'FAQController';
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
};

