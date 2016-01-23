///<reference path='../../../typings/tsd.d.ts'/>
import StationController = require('./StationController');
export = StationDirective;

class StationDirective implements ng.IDirective {
    public static htmlName: string = 'station';
    public controller = StationController;
    public controllerAs = 'ctrl';
    public scope = {};
    public bindToController = {
        station: '='
    };
    public templateUrl = 'app/templates/station.html';
    public restrict = 'E';

    public link(scope, element, attrs, ctrl) {

        /*
        $('.expander').click(function () {
            var body = $(this).parent().find('.station-body');
            if (body.is(':visible')) {
                ctrl.onStationHidden($(this));
                body.toggleClass('hidden');
            } else {
                ctrl.onStationVisible($(this));
                body.toggleClass('hidden');
            }
        });


        $('.ams-refresh').click(function () {
            var spinner = $(this).find('.fa-rotate-right')
            spinner.addClass('fa-spin');
            setTimeout(function () {
                spinner.removeClass('fa-spin');

                var now = new Date();
                var lastUpdated = 'Last updated ' + (now.getMonth() + 1) + '/' + now.getDate() + '/' + (now.getFullYear() + 1900) + ' at ' + now.getHours() % 12 + ':' + now.getMinutes() + ' ' + (now.getHours() < 12 ? 'am' : 'pm');
                spinner.closest('.station').find('.station-last-updated').text(lastUpdated);
            }, 4000);

        });
        */
    }

    public static create(): StationDirective {
        return new StationDirective();
    }
}
