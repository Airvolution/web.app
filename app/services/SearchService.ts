/// <reference path="../../typings/tsd.d.ts" />

export = SearchService;

class SearchService {
    public static serviceName = "SearchService";
    private baseUrl:string = '/search';
    private pageSize = 100;
    private endpointMap = {
        "datapoints": "/datapoints/_search",
        "stations": "/stations/_search"
    };
    static $inject = ['$http', '$q'];

    constructor(private $http,
                private $q) {
    }

    public getAllStations() {
        var url = this.getSearchUrl('stations');
        var query = SearchService.createEmptyQuery();
        this.getAllResults(url, query);
    }

    private getAllResults(query, url) {
        var deferred = this.$q.defer();
        var self = this;
        query.size = this.pageSize;
        this.$http.post(url, query).then((initialResponse)=> {
            var from = self.pageSize;
            var promises = [];
            var size = initialResponse.data.hits.total;
            while (from < size) {
                query.from = from;
                promises.push(self.$http.post(url, query));
                from += self.pageSize;
            }
            self.$q.all(promises).then((data)=> {
                var ret = [];
                _.map(data,(page:any)=>{
                    ret.push.apply(ret, page.hits.hits);
                });
                    deferred.resolve(ret);
                },
                (error)=> {
                    deferred.reject(error);
                });
        });
        return deferred.promise;
    }

    public static createEmptyQuery() {
        return {
            "query": {
                "match_all": {}
            }
        }
    }

    private getSearchUrl(type:string) {
        if (this.endpointMap[type]) {
            return this.baseUrl + this.endpointMap[type];
        } else {
            return this.baseUrl + '/_search';
        }
    }
}