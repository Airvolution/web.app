///<referecnce path="../../typings/tsd.d.ts"/>

export = AppController;

class AppController {
    public static name = "AppController";
    // public navVisible = false;
    static $inject = ["$scope"];
    constructor(private $scope) {
        console.log("set navVisible = false on load");
        $scope.navVisible = false;
    }

    public toggleNav() {
        // this.navVisible = !this.navVisible;
        console.log("toggly toggly toggly");
        this.$scope.navVisible = !this.$scope.navVisible;
    }
}