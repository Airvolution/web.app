///<reference path="../../typings/tsd.d.ts"/>
import angular = require('angular');
export = SiteNavDirective;

class SiteNavDirective implements ng.IDirective {
    public name = "siteNav";
    public templateUrl = "app/templates/siteNav.html";
    public restrict = "E";

    static create():SiteNavDirective {
        return new SiteNavDirective();
    }
}