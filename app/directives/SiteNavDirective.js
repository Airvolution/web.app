var SiteNavDirective = (function () {
    function SiteNavDirective() {
        this.name = "siteNav";
        this.templateUrl = "app/templates/siteNav.html";
        this.restrict = "E";
    }
    SiteNavDirective.create = function () {
        return new SiteNavDirective();
    };
    return SiteNavDirective;
})();
module.exports = SiteNavDirective;
//# sourceMappingURL=SiteNavDirective.js.map