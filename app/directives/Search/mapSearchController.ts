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
    public totalStationHits;
    public totalGroupHits;
    public totalFaqHits;

    public static $inject = ['$scope', 'SearchService', '$state'];

    constructor(private $scope, private SearchService, private $state) {
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
                    self.totalStationHits = results.total;
                    self.results.stations = _.map(results.hits, (hit:any)=>{
                        return hit._source;
                    });
                }else{
                    self.showStations = false;
                }
            });
            self.SearchService.searchGroups(newVal).then((results)=>{
                if(results.hits && results.hits.length > 0 ) {
                    self.showGroups = true;
                    self.totalGroupHits = results.total;
                    self.results.groups = _.map(results.hits,(hit:any)=>{
                        return hit._source;
                    });
                }else{
                    self.showGroups = false;
                }
            });
            self.SearchService.searchFAQs(newVal).then((results)=>{
                if(results.hits && results.hits.length > 0 ){
                    self.showFaq = true;
                    self.totalFaqHits = results.total;
                    self.results.faqs = _.map(results.hits, (hit:any)=>{
                       return hit;
                    });
                }else{
                    self.showFaq = false;
                }
            });
        });
        $scope.$on('$destroy', ()=> {
            deregister();
        });
    }

    public clearSearchResults(){
        this.showResults = false;
        this.results = {
            stations: [],
            groups: [],
            faqs: []
        };
        this.showFaq = false;
        this.showStations = false;
        this.showGroups = false;
    }

    public onStationResultClick(station){
        this.$scope.centerOnMarker(station.location);
        this.$scope.resetZoom(11);
        this.$scope.setSelectedStation(station);
        this.clearSearchResults();
    }

    public onGroupResultClick(group){
        //this.$scope.showGroup(group);
        this.clearSearchResults();
    }

    public onFaqResultClick(faq){
        this.$state.go('app.faq',{id:faq.id});
    }
}
