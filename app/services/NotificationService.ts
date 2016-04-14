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
        if (scope) {
            scope.$on('destroy', handler);
        }
        return handler;
    }

    public notify(event) {
        this.$rootScope.$emit(event);
    }
}
