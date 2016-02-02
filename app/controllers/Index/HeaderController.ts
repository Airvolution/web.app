///<referecnce path='../../typings/tsd.d.ts'/>

export = HeaderController;

class HeaderController {
    public static name = 'HeaderController';

    private modal;

    public static $inject = [
        '$scope',
        '$uibModal',
        'AuthService'
    ];
    constructor(
        private $scope,
        private $uibModal,
        public AuthService
    ) {
        $scope.showNav = false;
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
