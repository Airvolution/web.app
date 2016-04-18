/// <reference path="../../../typings/tsd.d.ts"/>

import SVGAQIController = require("./svgAQIController");
export = SVGAQIDirective

class SVGAQIDirective implements ng.IDirective {
    public static htmlName = "aqiScale";

    public restrict = "E";
    public templateUrl = "app/directives/AQI/svgAQITemplate.html";
    public controller = SVGAQIController;
    public controllerAs = "ctrl";
    public bindToController = true;
    public scope = {
        aqi: '='
    };

    public link = ($scope, $element, $attrs,$ctrl)=> {

        //DO NOT USE ANGULAR HERE. Regular DOM Manipulation with SVG doesn't work.
        //Relevant (necessary) styles are in aqiScale.less
        var category = $scope.$watch('ctrl.category', (newVal)=> {
            if(newVal === undefined){
                return;
            }
            document.querySelector('#indicator circle').setAttribute("class", newVal + '_indicator');
            document.querySelector('#gradient').setAttribute("class", newVal + '_gradient');
        });

        var aqi = $scope.$watch('ctrl.aqi', (newVal)=> {
            if(newVal === undefined){
                return;
            }
            document.querySelector('#indicator text').textContent = "" + newVal ? newVal : '';
            $ctrl.update(newVal);
        });

        var percent = $scope.$watch('ctrl.percentOfCategory', (newVal)=> {
            if (newVal == undefined) {
                return;
            }
            newVal = newVal < 0 ? 0 : newVal;
            newVal = newVal > 100 ? 100 : newVal;
            var yBase = 35;
            var base = 32;
            var factor = 4.66;
            var update = base + newVal * factor;
            document.querySelector('#indicator').setAttribute('transform', "translate(" + update + "," + yBase + ")");
        });

        $scope.$on('$destroy',()=>{
            category();
            aqi();
            percent();
        })

    };

    public static create() {
        return new SVGAQIDirective();
    }

    constructor() {
    }
}