///<reference path='../../../typings/tsd.d.ts'/>
export = SiteNavDirective;

class SiteNavDirective implements ng.IDirective {
    public static htmlName: string = 'siteNav';
    public templateUrl = 'app/templates/siteNav.html';
    public restrict = 'E';

    public static create(): SiteNavDirective {
        return new SiteNavDirective();
    }
}
