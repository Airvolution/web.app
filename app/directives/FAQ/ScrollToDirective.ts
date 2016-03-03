/// <reference path="../../../typings/tsd.d.ts" />

export = ScrollToDirective;

class ScrollToDirective implements ng.IDirective {
    public static htmlName = 'scrollTo';
    public restrict = 'A';
    public link = ($scope, $element, $attrs)=>{
        $scope.$watch($attrs[ScrollToDirective.htmlName], (value)=>{
            if (value) {
                var pos = $("#"+value, $element).position().top;
                $element.animate({
                    scrollTop : pos
                }, 750);
            }
        });
    };
    public static create(){
        return new ScrollToDirective();
    }
}
