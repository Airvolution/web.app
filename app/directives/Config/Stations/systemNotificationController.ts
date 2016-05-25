///<reference path='../../../../typings/tsd.d.ts'/>
export = SystemNotificationController;

class SystemNotificationController {
    public static $inject = [];
    constructor() {}
    public type;
    public subtype;
    public stationId;

    public get notificationClass(){
        return this.type == 'error' ? 'system-error' : 'system-warning';
    }

    public get indicatorClass(){
        return this.type == 'error' ? 'error-indicator' : 'warning-indicator';
    }

    public get notificationType() {
        return this.type == 'error' ? 'Error' : 'Warning';
    }

    public get message() {
        switch (this.subtype) {
            case 'malfunctioning':
                return 'may be malfunctioning.';
            case 'offline':
                return 'is offline';
            case 'misconfigured':
                return 'may be misconfigured';
        }
    }
}
