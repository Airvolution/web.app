///<referecnce path='../../typings/tsd.d.ts'/>

export = HeaderController;

class HeaderController {
    public static name = 'HeaderController';

    private modal;
    private location;

    public static $inject = [
        '$scope',
        '$uibModal',
        'AuthService',
        'locationService',
        '$location'
    ];
    constructor(
        private $scope,
        private $uibModal,
        public AuthService,
        private locationService,
        private $location
    ) {
        $scope.showNav = false;
        this.location = locationService.asyncGetGeoCoordinates();

        $scope.isActive = function (viewLocation) {
            console.log('isActive will return: ' + viewLocation == $location.path());
            return viewLocation == $location.path();
        };
    }

    public toggelNav() {
        console.log('toggling nav...');
        this.$scope.showNav = !this.$scope.showNav;
    }

    public openLogin() {
        this.modal = this.$uibModal.open({
            templateUrl: 'app/templates/loginTemplate.html',
            controller: 'UserRegistrationController',
            controllerAs: 'ctrl',
            bindToController: true
        });
        var self = this;
        this.modal.result.then((result)=> {
            self.modal = undefined;
        });
    }

    public openRegister() {
        this.modal = this.$uibModal.open({
            templateUrl: 'app/templates/registerTemplate.html',
            controller: 'UserRegistrationController',
            controllerAs: 'ctrl',
            bindToController: true
        });
        var self = this;
        this.modal.result.then((result)=> {
            self.modal = undefined;
        });
    }
}
