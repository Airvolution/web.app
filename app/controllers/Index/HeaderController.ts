///<referecnce path='../../typings/tsd.d.ts'/>

export = HeaderController;
class HeaderController {
    public static name = 'HeaderController';
    public static $inject = ['$scope'];
    constructor(private $scope) {
        $scope.showNav = false;
    }

    public toggelNav() {
        console.log('toggling nav...');
        this.$scope.showNav = !this.$scope.showNav;
    }
}
