///<reference path='./typings/tsd.d.ts' />

import Services = require('./app/services/module');
import Controllers = require('./app/controllers/module');
import Directives = require('./app/directives/module');
import Widgets = require('./app/widgets/module');

var defaultState = "app.map";
var defaultConfigState = "app.config.profile";
angular.module('app', [
        'nemLogging',
        'ui-leaflet',
        'ui.router',
        'ct.ui.router.extras',
        Services.name,
        Controllers.name,
        Directives.name,
        Widgets.name,
        'nvd3',
        'ngStorage',
        'ui.bootstrap',
        'ngAnimate',
        'ngSanitize',
        'angularMoment',
        'ngMaterial',
        'ngMessages'
    ])
    .config(($stateProvider, $urlRouterProvider, $httpProvider) => {

        var openModal = ['$uibModal', '$previousState', ($uibModal, $previousState)=> {
            $previousState.memo("modalInvoker"); // remember the previous state with memoName "modalInvoker"
            $uibModal.open({
                templateUrl: 'app/templates/modalTemplate.html',
                backdrop: 'static',
                controller: ['$uibModalInstance', '$scope', ($uibModalInstance, $scope)=> {
                    $scope.configureModal = (title, okText, onOk, cancelText, onCancel)=> {
                        $scope.modalTitle = title;
                        $scope.okText = okText;
                        $scope.okAction = onOk;
                        $scope.cancelText = cancelText;
                        $scope.cancelAction = onCancel;
                    };
                    $scope.setAlert = (alert)=> {
                        $scope.alert = alert;
                    };
                    var isopen = true;
                    $uibModalInstance.result.finally(function () {
                        isopen = false;
                        $previousState.go("modalInvoker"); // return to previous state
                    });
                    $scope.closeModal = function () {
                        $uibModalInstance.dismiss('close');
                    };
                    $scope.$on("$stateChangeStart", function (evt, toState) {
                        if (!toState.$$state().includes['modal']) {
                            $uibModalInstance.dismiss('close');
                        }
                    });
                }]
            })
        }];

        var states = [];
        states.push({
            name: 'modal',
            url: '/modal/',
            onEnter: openModal,
            template: '<div ui-view></div>'
        });
        states.push({
            name: 'modal.login',
            url: 'login/',
            template: '<user-login></user-login>'
        });
        states.push({
            name: 'modal.error',
            url: 'error/',
            templateUrl: 'app/templates/errorModalTemplate.html',
            controller: 'ErrorModalController as ctrl'
        });
        states.push({
            name: "modal.calibrate",
            url: 'calibrate/:id',
            template: '<calibrate-station></calibrate-station>'
        });
        states.push({
            name: 'modal.resetPassword',
            url: 'password/reset',
            template: '<user-reset-password></user-reset-password>'
        });
        states.push({
            name: 'modal.resetComplete',
            url: 'password/reset/complete',
            template: '<password-reset-modal></password-reset-modal>'
        });
        states.push({
            name: 'modal.emailConfirmed',
            url: 'email/confirmed',
            template: "<email-confirmed-modal></email-confirmed-modal>"
        });

        states.push({
            name: 'app',
            url: '/',
            deepStateRedirect: {default: {state: defaultState}},
            sticky: true,
            views: {
                'app': {
                    template: '<div ui-view></div>',
                }
            }

        });
        states.push({
            name: 'app.config',
            url: 'config/',
            deepStateRedirect: {default: defaultConfigState},
            template: '<config-view></config-view>',
            requireAuth: true
        });

        states.push({
            name: 'app.config.profile',
            url: 'profile/',
            template: '<my-profile></my-profile>',
            requireAuth: true
        });
        states.push({
            name: 'app.config.stations',
            url: 'stations/',
            template: '<my-stations></my-stations>',
            requireAuth: true
        });
        states.push({
            name: 'app.config.register',
            url: 'register/',
            template: '<register-station></register-station>',
            requireAuth: true
        });
        states.push({
            name: 'app.config.preferences',
            url: 'preferences/',
            template: '<user-preferences></user-preferences>',
            requireAuth: true
        });
        states.push({
            name: 'app.map',
            url: 'map?mode&cluster',
            template: '<map-view></map-view>'

        });
        states.push({
            name: 'app.almanac',
            url: 'almanac/',
            template: '<almanac-view></almanac-view>'
        });
        states.push({
            name: 'app.compare',
            url: 'compare/',
            template: '<compare-view></compare-view>'
        });
        states.push({
            name: 'app.faq',
            url: 'faq?id',
            template: '<faq-view></faq-view>'
        });
        states.push({
            name: 'app.about',
            url: 'about/',
            template: '<about></about>'
        });

        angular.forEach(states, (state)=> {
            $stateProvider.state(state);
        });
        $urlRouterProvider.otherwise("/");
        $httpProvider.interceptors.push('AuthInterceptorService');
    })
    .run(['AuthService', (authService)=> {
        authService.fillAuthData();
    }])
    .run(['$rootScope', '$state', 'AuthService', ($rootScope, $state, authService)=> {
        //Default Background state for modals, then we can deeplink them without breaking the app
        $rootScope.$state = $state;
        $rootScope.$on("$stateChangeStart", (evt, toState, toParams, fromState)=> {
            // Is initial transition and is going to modal.*?
            if (fromState.name === '' && /modal.*/.exec(toState.name)) {
                evt.preventDefault(); // cancel initial transition

                $state.go(defaultState, null, {location: false}).then(() => {
                        $state.go(toState, toParams);
                    }
                );
            }
        });

        $rootScope.$on('$stateChangeStart', (evt, toState, toParams, fromState)=> {
            if (toState.requireAuth && !authService.authentication.isAuth) {
                evt.preventDefault();
                var errorModal = $state.get('modal.error');
                errorModal.message = "You must be logged in to access this part of the application";
                errorModal.redirectMessage = "Login";
                errorModal.redirectState = 'modal.login';

                $state.go('modal.error');
            }
        });
    }]);
//.run(['$rootScope', ($rootScope)=> {
//    // ============================================= Debug UI-Router
//    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//        console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
//    });
//
//    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
//        console.log('$stateChangeError - fired when an error occurs during transition.');
//        console.log(arguments);
//    });
//
//    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//        console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
//    });
//
//    $rootScope.$on('$viewContentLoaded', function (event) {
//        console.log('$viewContentLoaded - fired after dom rendered', event);
//    });
//
//    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
//        console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
//        console.log(unfoundState, fromState, fromParams);
//    });
//}]);