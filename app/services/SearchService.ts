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
    public static $inject = ['$http', '$q'];

    constructor(private $http,
                private $q) {
    }

    public getAllStations() {
        var url = this.getSearchUrl('stations');
        var query = SearchService.createEmptyQuery();
        return this.getAllResults(url, query);
    }

    private getAllResults(url, query) {
        var deferred = this.$q.defer();
        var self = this;
        query.size = this.pageSize;
        this.$http.post(url, query).then((initialResponse)=> {
            var from = self.pageSize;
            var promises = [];
            var size = initialResponse.data.hits.total;
            while (from < size) {
                var temp = angular.copy(query);
                temp.from = from;
                promises.push(self.$http.post(url, temp));
                from += self.pageSize;
            }
            self.$q.all(promises).then((data)=> {
                    data.push(initialResponse);
                    var ret = _.chain(data)
                        .map((page:any)=> {
                            return page.data.hits.hits;
                        })
                        .flatten(true)
                        .value();
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
        };
    }

    private getSearchUrl(type:string) {
        if (this.endpointMap[type]) {
            return this.baseUrl + this.endpointMap[type];
        } else {
            return this.baseUrl + '/_search';
        }
    }
}
