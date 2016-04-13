/// <reference path="../../../../typings/tsd.d.ts" />

export = PasswordResetModalController;

class PasswordResetModalController {
    public static $inject = ['$scope'];
    public constructor(private $scope){
        $scope.configureModal("Password successfully reset");
    }
}