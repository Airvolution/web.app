///<reference path="../../typings/tsd.d.ts" />

export = NotificationService;

class NotificationService {
    public static serviceName = 'notificationService';

    public static $inject = ['$rootScope'];
    constructor(
        private $rootScope
    ) {

    }

    public subscribe(scope, event, callback) {
        let handler = this.$rootScope.$on(event, callback);
        scope.$on('destroy', handler);
    }

    public notify(event) {
        this.$rootScope.$emit(event);
    }
}
