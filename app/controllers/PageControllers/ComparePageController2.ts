///<reference path='../../../typings/tsd.d.ts' />

export = ComparePageController2;

class ComparePageController2 {
    public static name = 'ComparePageController2';
    public static $inject = ['$scope', '$log'];

    constructor(
        private $scope,
        private $log
    ) {
        // empty constructor
        $log.log('COMPARE PAGE 2 CONSTRUCTOR');
    }

}
