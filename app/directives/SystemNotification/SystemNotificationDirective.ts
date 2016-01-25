///<reference path='../../../typings/tsd.d.ts'/>
import SystemNotificationController = require('./SystemNotificationController');
export = SystemNotificationDirective;

class SystemNotificationDirective implements ng.IDirective {
    public static htmlName = 'systemNotification';
    public templateUrl = 'app/templates/systemNotification.html';
    public restrict = 'E';
    public controller = SystemNotificationController;
    public controllerAs = 'ctrl';
    public scope = {};
    public bindToController = {
        type: '@',
        subtype: '@',
        stationId: '@'
    };

    public link(scope, element, atttrs, ctrl) {
        $('.close').click(function() {
            $(this).parent().remove();
            // this should probably be abstracted somehow so it is not dependent
            // on structure or classes outside this directive
            if ($('.warning-wrapper .close').length == 0) {
                $('.warning-wrapper').remove();
            }
        });
    }

    public static create(): SystemNotificationDirective {
        return new SystemNotificationDirective();
    }
}
