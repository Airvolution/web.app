///<reference path='../../../typings/tsd.d.ts'/>
export = FooterDirective;

class FooterDirective implements ng.IDirective {
    public static htmlName = 'pageFooter';
    public templateUrl = 'app/templates/footer.html';
    public restrict = 'E';

    public static create(): FooterDirective {
        return new FooterDirective();
    }
}
