/// <reference path="../../../typings/tsd.d.ts" />

export = FAQViewController;

class FAQViewController {

    public scrollPos;
    public static $inject = ['$timeout','$stateParams'];

    constructor(private $timeout,$stateParams) {
        if($stateParams.id){
            var prefix = 'section';
            this.scrollTo(prefix+$stateParams.id);
        }
    };

    public scrollTo(id) {
        this.scrollPos = id;
        var self = this;
        this.$timeout(()=> {
            self.scrollPos = undefined;
        }, 250);
    };
}
