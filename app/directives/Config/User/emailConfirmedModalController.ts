/// <reference path="../../../../typings/tsd.d.ts" />

export = EmailConfirmedModalController;

class EmailConfirmedModalController {
    public static $inject = ['$scope'];
    public constructor(private $scope){
        $scope.configureModal("Your email has been confirmed");
    }
}
