/// <reference path="../../../typings/tsd.d.ts" />

export = MapSearchController;

class MapSearchController {
    public results;
    public modelOptions;
    public query;

    public showResults;
    public showStations;
    public showGroups;
    public showFaq;

    public static $inject = ['$scope', 'SearchService'];

    constructor(private $scope, private SearchService) {
        this.results = {
            stations: [],
            groups: [],
            faqs: []
        };
        this.query = '';
        this.showResults = false;
        this.showFaq = false;
        this.showGroups = false;
        this.showStations = false;
        this.modelOptions = {
            updateOn: 'default blur',
            debounce: {
                default: 500,
                blur: 0
            }
        };
        var self = this;
        var deregister = $scope.$watch('ctrl.query', (newVal)=> {
            self.clearSearchResults();
            if(!newVal){
                self.showResults = false;
                self.showFaq = false;
                self.showGroups = false;
                self.showStations = false;
                return;
            }
            self.showResults = true;
            self.SearchService.searchStations(newVal).then((results)=>{
                if(results.hits && results.hits.length > 0 ){
                    self.showStations = true;
                    self.results.stations = _.map(results.hits, (hit:any)=>{
                        return hit._source;
                    });
                }else{
                    self.showStations = false;
                }
            });
            self.SearchService.searchGroups(newVal).then((results)=>{
                if(results.hits && results.hits.length > 0 ) {
                    self.results.groups = _.map(results.hits,(hit:any)=>{
                        self.showGroups = true;
                        return hit._source;
                    });
                }else{
                    self.showGroups = false;
                }
            });
            self.SearchService.searchFAQs(newVal).then((results)=>{
                if(results.hits && results.hits.length > 0 ){
                    self.showFaq = true;
                    self.results.faqs = _.map(results.hits, (hit:any)=>{
                       return hit._source;
                    });
                }else{
                    self.showFaq = false;
                }
            });
        });
        $scope.$on('$destroy', ()=> {
            deregister();
        })
    }

    public clearSearchResults(){
        this.results = {
            stations: [],
            groups: [],
            faqs: []
        };
    }
}