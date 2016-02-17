export = FAQController;

class FAQController {
    public static name = 'FAQController';
    public static $inject = ['$scope', '$location', '$anchorScroll'];

    let _scope;
    let _location;
    let _anchorScroll;

    constructor(
        private $scope,
        private $location,
        private $anchorScroll
    ) {
        console.log('FAQController constructor');

        _scope = $scope;

        $scope.scrollTo = (id)=> {
            $location.hash(id);
            $anchorScroll();
        };
    };

    public scrollTo(id) {
        $location.hash(id);
        $anchorScroll();
    }
};

