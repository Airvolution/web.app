///<referecnce path='../../typings/tsd.d.ts'/>

export = AppController;

class AppController {
    public static name = 'AppController';
    // public navVisible = false;
    public static $inject = ['$scope'];
    constructor(private $scope) {
        $scope.navVisible = false;
    }

    public toggleNav() {
        // this.navVisible = !this.navVisible;
        this.$scope.navVisible = !this.$scope.navVisible;
    }
}
