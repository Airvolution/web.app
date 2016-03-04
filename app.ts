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
        'angularMoment',
        'ngMaterial'
    ])
    .config(($stateProvider, $urlRouterProvider, $httpProvider) => {
        $urlRouterProvider.deferIntercept();

        var openModal = ['$uibModal', '$previousState', ($uibModal, $previousState)=> {
            $previousState.memo("modalInvoker"); // remember the previous state with memoName "modalInvoker"
            $uibModal.open({
                templateUrl: 'app/templates/modalTemplate.html',
                backdrop: 'static',
                controller: ['$uibModalInstance', '$scope', ($uibModalInstance, $scope)=> {
                    $scope.configureModal = (title,okText,onOk,cancelText,onCancel)=>{
                        $scope.modalTitle = title;
                        $scope.okText = okText;
                        $scope.okAction = onOk;
                        $scope.cancelText = cancelText;
                        $scope.cancelAction = onCancel;
                    };
                    $scope.setAlert = (alert)=>{
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
            name:'modal.login',
            url: 'login/',
            templateUrl: 'app/templates/loginTemplate.html',
            controller: 'UserRegistrationController'
        });
        states.push({
            name: 'app',
            url: '/',
            deepStateRedirect: {default: defaultState},
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
            templateUrl: 'app/templates/configTemplate.html'
        });

        states.push({
            name: 'app.config.profile',
            url: 'profile/',
            templateUrl: 'app/templates/myProfile.html'
        });
        states.push({
            name: 'app.config.stations',
            url: 'stations/',
            templateUrl: 'app/templates/myStations.html'
        });
        states.push({
            name: 'app.config.register',
            url: 'register/',
            templateUrl: 'app/templates/registerStation.html'
        });
        states.push({
            name: 'app.config.preferences',
            url: 'preferences/',
            templateUrl: 'app/templates/userPreferences.html'
        });
        states.push({
            name: 'app.map',
            url: 'map?mode&cluster',
            template: '<map-view></map-view>'
            //controller: 'MapViewController' <-- triggers angular exception

        });
        //states.push({
        //    name: 'app.map.mode',
        //    url: '/:mode'
        //});
        //states.push({
        //    name: 'app.map.cluster',
        //    url: '/:cluster'
        //});
        //states.push({
        //    name: 'app.map.mode',
        //    url: 'map?mode'
        //});
        //states.push({
        //    name: 'app.map.cluster',
        //    url: 'map?cluster'
        //});
        states.push({
            name: 'app.almanac',
            url: 'almanac/',
            template: '<almanac-view></almanac-view>'
        });
        states.push({
            name: 'app.compare',
            url: 'compare/',
            templateUrl: 'app/templates/compare.html'
        });
        states.push({
            name: 'app.indoor',
            url: 'indoor/',
            templateUrl: 'app/templates/indoor.html'
        });
        states.push({
            name: 'error',
            templateUrl: 'app/templates/404.html'
        });
        states.push({
            name: 'app.about',
            url: 'about/',
            templateUrl: 'app/templates/aboutUs.html'
        });
        states.push({
            name: 'app.contact',
            url: 'contact/',
            templateUrl: 'app/templates/contactUs.html'
        });
        states.push({
            name: 'app.faq',
            url: 'faq?id',
            template: '<faq-view></faq-view>'
        });
        states.push({
            name: 'app.disclaimer',
            url: 'disclaimer/',
            templateUrl: 'app/templates/disclaimer.html'
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
    .run(['$rootScope', '$urlRouter', '$location', '$state', function ($rootScope, $urlRouter, $location, $state) {
        let state = $state;
        $rootScope.$on('$locationChangeSuccess', function (e, newUrl, oldUrl) {
            e.preventDefault();
            if (oldUrl.match(/map/g) !== null && newUrl.match(/map/g) !== null) {
                // does not trigger view to reload
                console.log('$locationChangeSuccess: if block');
                // do nothing

            } else {
                // triggers view to reload
                console.log('$locationChangeSuccess: else block');
                $urlRouter.sync();
            }
        });
    }])
    .run(['$rootScope','$state','$previousState',($rootScope,$state,$previousState)=>{
        //Default Background state for modals, then we can deeplink them without breaking the app
        $rootScope.$state = $state;
        $rootScope.$on("$stateChangeStart", function(evt, toState, toParams, fromState) {
            // Is initial transition and is going to modal.*?
            if (fromState.name === '' && /modal.*/.exec(toState.name)) {
                evt.preventDefault(); // cancel initial transition

                $state.go(defaultState, null, { location: false }).then(function() {
                    $state.go(toState, toParams); }
                );
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