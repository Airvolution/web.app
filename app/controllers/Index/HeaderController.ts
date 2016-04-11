///<referecnce path='../../typings/tsd.d.ts'/>

export = HeaderController;

class HeaderController {
    public static name = 'HeaderController';
    private location;

    public static $inject = [
        '$scope',
        '$uibModal',
        'AuthService',
        'locationService'
    ];
    constructor(
        private $scope,
        private $uibModal,
        public AuthService,
        private locationService
    ) {
        this.location = locationService.asyncGetGeoCoordinates();
    }
}
