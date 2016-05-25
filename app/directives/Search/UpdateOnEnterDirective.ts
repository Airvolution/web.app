/// <reference path="../../../typings/tsd.d.ts" />

export = UpdateOnEnterDirective;

class UpdateOnEnterDirective implements ng.IDirective {
    public static htmlName = 'updateOnEnter';
    public restrict = 'A';
    public require = 'ngModel';
    public link = ($scope, $element, $attrs, $ngModelCtrl) => {
    $element.bind("keyup",(e) => {
            if (e.keyCode === 13) {
                $ngModelCtrl.$commitViewValue();
            }
        });
    };

    public constructor(){}
    public static create() {
        return new UpdateOnEnterDirective();
    }
}
