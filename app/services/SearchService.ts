/// <reference path="../../typings/tsd.d.ts" />

export = SearchService;

class SearchService {
    public static serviceName = "SearchService";
    private baseUrl:string = '/search';
    private pageSize = 100;
    private endpointMap = {
        //"datapoints": "/datapoints/_search",
        "parameters": "/stations/_search",
        "stations": "/stations/_search",
        "faq": "/faqs/_search",
        "groups": "/groups/_search"
    };
    private stopWords = [
        'a',
        'an',
        'and ',
        'are',
        'as ',
        'at ',
        'be ',
        'by ',
        'for ',
        'from',
        'has',
        'he',
        'in',
        'is',
        'it',
        'its',
        'of',
        'on',
        'that',
        'the',
        'to',
        'was',
        'were',
        'will',
        'with'
    ];
    public static $inject = ['$http', '$q'];

    constructor(private $http,
                private $q) {
    }

    private filterStopwords(query) {
        query = query.toLowerCase();
        var arr = query.split(' ');
        arr = _.difference(arr, this.stopWords);
        return arr.join(' ');

    }

    private createFuzzyQuery(query) {
        var arr = query.split(' ');
        var tmp = [];
        for (var i = 0; i < arr.length; i++) {
            tmp.push('*' + arr[i] + '*');
        }
        return tmp.join(' ');
    }

    public searchFAQs(queryString:string) {
        var url = this.getSearchUrl('faq');
        var filteredQuery = this.filterStopwords(queryString);
        var query = {
            "query": {
                "multi_match": {
                    "query": filteredQuery,
                    "type": "cross_fields",
                    "fields": [
                        "question",
                        "answer"
                    ],
                    "cutoff_frequency": .01
                }
            },
            "highlight": {
                "pre_tags": [
                    "<mark>"
                ],
                "post_tags": [
                    "</mark>"
                ],
                "fields": {
                    "question": {},
                    "answer": {}
                }
            }
        };
        return this.$http.post(url, query).then((results)=> {
            return results.data && results.data.hits ? results.data.hits : [];
        }, (error)=> {
            return error;
        });
    }

    public searchStations(queryString:string) {
        var url = this.getSearchUrl('stations');
        var filteredQuery = this.filterStopwords(queryString);
        var query = {
            "query": {
                "bool": {
                    "should": [
                        {
                            "multi_match": {
                                "query": filteredQuery,
                                "type": "cross_fields",
                                "fields": [
                                    "id",
                                    "name",
                                    "agency",
                                    "city",
                                    "state",
                                    "postal"
                                ],
                                "cutoff_frequency": .01
                            }
                        },
                        {
                            "prefix": {
                                "name": filteredQuery
                            }
                        },
                        {
                            "prefix": {
                                "name": queryString
                            }
                        }
                    ],
                    "minimum_should_match" : 1
                }

            }
        };

        return this.$http.post(url, query).then((results)=> {
            return results.data && results.data.hits ? results.data.hits : [];
        });
    }

    public searchGroups(queryString:string) {
        var url = this.getSearchUrl('groups');
        var filteredQuery = this.filterStopwords(queryString);
        var query = {
            "query": {
                "bool": {
                    "should": [
                        {
                            "multi_match": {
                                "query": filteredQuery,
                                "type": "cross_fields",
                                "fields": [
                                    "id",
                                    "name",
                                    "full_name",
                                    "description",
                                    "stations",
                                    "owner_id"
                                ],
                                "cutoff_frequency": .01
                            }
                        },
                        {
                            "prefix": {
                                "name": filteredQuery
                            }
                        },
                        {
                            "prefix": {
                                "name": queryString
                            }
                        }
                    ],
                    "minimum_should_match" : 1
                }

            }
        };

        return this.$http.post(url, query).then((results)=> {
            return results.data && results.data.hits ? results.data.hits : [];
        });
    }

    public getAllStations() {
        var url = this.getSearchUrl('stations');
        var query = {
            "query": {
                "match_all": {}
            }
        };
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

    private getSearchUrl(type:string) {
        if (this.endpointMap[type]) {
            return this.baseUrl + this.endpointMap[type];
        } else {
            return this.baseUrl + '/_search';
        }
    }
}
