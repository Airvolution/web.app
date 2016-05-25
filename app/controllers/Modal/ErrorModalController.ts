/// <reference path="../../../typings/tsd.d.ts" />

export = ErrorModalController;

class ErrorModalController {
    public message;
    public redirectMessage;
    public redirectState;
    public redirectParams;

    public static name = "ErrorModalController";
    public static $inject = ['$state', '$scope'];

    public constructor(private $state, private $scope) {

        var state = $state.get('modal.error');
        this.message = state.message || 'An unknown error occurred.';
        this.redirectMessage = state.redirectMessage || 'Exit';
        this.redirectState = state.redirectState || 'app';
        this.redirectParams = state.redirectParams ? angular.copy(state.redirectParams) : {};

        var self = this;
        $scope.configureModal('Error',
            this.redirectMessage,
            ()=> {
                $state.go(self.redirectState, self.redirectParams);
            },
            "Cancel",
            ()=> {
                $scope.closeModal();
            });

        state.message = undefined;
        state.redirectMessage = undefined;
        state.redirectState = undefined;
        state.redirectParams = undefined;
    }

}

