///<referecnce path='../../typings/tsd.d.ts'/>

export = HeaderController;

class HeaderController {
    public static name = 'HeaderController';
    public static $inject = ['$scope', '$log', 'openWeatherService'];
    constructor(
        private $scope,
        private $log,
        private openWeatherService
    ) {
        $scope.showNav = false;
        this.getWeather();
    }

    public toggelNav() {
        console.log('toggling nav...');
        this.$scope.showNav = !this.$scope.showNav;
    }

    public getWeather() {
        this.openWeatherService.test();
    }
}
