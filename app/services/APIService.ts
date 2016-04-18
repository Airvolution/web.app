///<reference path="../../typings/tsd.d.ts" />

export = APIService;

class APIService {
    public static serviceName = 'APIService';
    public static $inject = ['$http', '$httpParamSerializer', '$q', '$log','locationService', '$timeout'];
    constructor(
        private $http,
        private $httpParamSerializer,
        private $q,
        private $log,
        private locationService,
        private $timeout
    ) {}

    public createGroup(group){
        var deferred = this.$q.defer();
        let onError = (error) => { deferred.reject(error); };
        return this.$http.post('api/groups',group).then((response) => {
            return response.data;
        }, onError);
    }

    public getUserGroups(){
        var deferred = this.$q.defer();
        let onError = (error) => { deferred.reject(error); };
        return this.$http.get('api/groups').then((response) => {
            return response.data;
        }, onError);
    }

    public getUserGroup(id) {
        let deferred = this.$q.defer();
        let onError = (error) => { deferred.reject(error); };
        return this.$http.get('api/groups/' + id).then((response) => {
            return response.data;
        }, onError);
    }

    public addStationToGroup(group, stationIds) {
        var deferred = this.$q.defer();
        let onError = (error) => { deferred.reject(error); };
        let params = this.$httpParamSerializer({ 'id': stationIds });
        return this.$http.put('api/groups/'+group.id+'/stations?'+params).then((response) => {
            return response.data;
        }, onError);
    }

    public removeStationFromGroup(group, stationIds) {
        var deferred = this.$q.defer();
        let onError = (error) => { deferred.reject(error); };
        let params = this.$httpParamSerializer({ 'id': stationIds });
        return this.$http.delete('api/groups/'+group.id+'/stations?'+params).then((response) => {
            return response.data;
        }, onError);
    }

    public deleteGroup(group){
        var deferred = this.$q.defer();
        let onError = (error) => { deferred.reject(error); };
        return this.$http.delete('api/groups/'+group.id).then((response) => {
            if(response.status == 200){
                return true;
            }
            return false;
        }, onError);
    }

    public getUserPreferences() {
        var deferred = this.$q.defer();
        let onError = (error) => { deferred.reject(error); };
        return this.$http.get('api/users/preferences').then((response) => {
            return response.data;
        }, onError);
    }

    public updateUserPreferences(preferences) {
        var deferred = this.$q.defer();
        let data = JSON.stringify(preferences);
        let onError = (error) => { deferred.reject(error); };
        return this.$http.post('api/users/preferences', data).then((response) => {
            return response.data;
        }, onError);
    }

    public getUserProfile(){
        var deferred = this.$q.defer();
        var self = this;
        var onError = (error)=>{deferred.reject(error);};
        return this.$http.get('api/users/current').then((response)=>{
            return response.data;
        },onError);
    }

    public updateUserProfile(profile){
        var deferred = this.$q.defer();
        var self = this;
        var onError = (error)=>{deferred.reject(error);};
        return this.$http.put('api/users/current',profile).then((response)=>{
            return response.data;
        },onError);
    }

    public resetUserPassword(current, password){
        var deferred = this.$q.defer();
        var onError = (error)=>{deferred.reject(error);};
        return this.$http.post('api/users/current/password',{currentPassword: current, password:password}).then((response)=>{
            if(response.status == 200){
                return true;
            }else {
                return false;
            }
        },onError);
    }
    public sendPasswordResetEmail(email){
        var deferred = this.$q.defer();
        var onError = (error)=>{
            deferred.reject(error);};
        return this.$http.get('api/users/password/reset?email='+email).then((response)=>{
            if(response.status == 200){
                return true;
            }else {
                return false;
            }
        },onError);
    }

    public getUserStations(){
        var deferred = this.$q.defer();
        var self = this;
        var onError = (error)=>{deferred.reject(error);};
        return this.$http.get('api/users/stations').then((response)=>{
            return response.data;
        },onError);
    }

    public getStation(id){
        var deferred = this.$q.defer();
        var self = this;
        var onError = (error)=>{deferred.reject(error);};
        return this.$http.get('api/stations/'+id).then((response)=>{
            return response.data;
        },onError);
    }

    public updateStation(station){
        var deferred = this.$q.defer();
        var self = this;
        var onError = (error)=>{deferred.reject(error);};
        return this.$http.put('api/stations/'+station.id,station).then((response)=>{
            return response.data;
        },onError);
    }

    public getStationAdjustments(id) {
        var deferred = this.$q.defer();
        var onError = (error) => { deferred.reject(error); };
        return this.$http.get('api/stations/' + id + '/adjustments').then((response) => {
            return response.data;
        }, onError);
    }

    public updateStationAdjustments(id, adjustments) {
        var deferred = this.$q.defer();
        let data = JSON.stringify(adjustments);
        var onError = (error) => { deferred.reject(error); };
        return this.$http.post('api/stations/' + id + '/adjustments', data).then((response) => {
            return response.data;
        }, onError);
    }

    public getDailies(days) {
        var deferred = this.$q.defer();
        var self = this;
        var onError = (error)=>{deferred.reject(error);};
        this.locationService.asyncGetGeoCoordinates().then((location)=>{
            var locationParameter = {
                params:location
            };
            self.$http.get('api/stations/nearest',locationParameter).then((stationData)=>{
                var dailiesParameters = {
                    params: {
                        stationId:stationData.data.id,
                        daysBack:days
                    }
                };
               self.$http.get('api/almanac/dailies',dailiesParameters).then((dailies)=>{
                  deferred.resolve(dailies.data);
               },onError);
            },onError);
        },onError);
        return deferred.promise;
    }
    public asyncGetMarkersInside(bounds) {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'api/stations/locations';
        let config = {
            params: {
                latMin: bounds.southWest.lat,
                latMax: bounds.northEast.lat,
                lngMin: bounds.southWest.lng,
                lngMax: bounds.northEast.lng
            }
        };

        self.$http.get(url, config).then(
            function(response) {
                deferred.resolve(response);
            },
            function(response) {
                self.$log.debug('No markers returned');
                deferred.reject([
                    // empty array
                ]);
            }
        );

        return deferred.promise;
    }

    public asyncGetNearestStation(location) {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'api/stations/nearest';
        let config = {
            params: {
                lat: location.lat,
                lng: location.lng
            }
        };

        self.$http.get(url, config).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject({});
            }
        );

        return deferred.promise;
    }

    public asyncGetLastDataPointFrom(stationID) {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'api/stations/latestDataPoint/' + stationID;
        self.$http.get(url).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject([
                    // empty array
                ]);
            }
        );

        return deferred.promise;
    }

    public asyncGetDataPointsFrom(stationID) {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'api/stations/datapoints/' + stationID;
        self.$http.get(url).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject([
                    // empty array
                ]);
            }
        );

        return deferred.promise;
    }

    public downloadDataFromStation(ids, params, dates) {
        let config = {
            StationIds: ids,
            Parameters: params,
            FromDate: dates[0],
            ToDate: dates[1]
        };
        let url = '/api/stations/download?' + this.$httpParamSerializer(config);

        let iframe = angular.element('<iframe id="download-frame"/>').attr({
            src:url,
            style:'visibility:none;display:hidden;'
        });
        angular.element('body').append(iframe);

        this.$timeout(function() {
            angular.element('#download-frame').remove();
        }, 10000);
    }

    public asyncGetNVD3DataPointsFrom(ids, params, dates) {
        var deferred = this.$q.defer();

        let self = this;
        let url = "api/stations/parameterValues";
        let config = {
            params: {
                StationIds: ids,
                Parameters: params,
                FromDate: dates[0],
                ToDate: dates[1]
            }
        };
        self.$http.get(url, config).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response);
            }
        );

        return deferred.promise;
    }

    public GetFAQs() {
        var deferred = this.$q.defer();

        let self = this;
        let url = "api/faq";

        self.$http.get(url).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response);
            }
        );

        return deferred.promise;
    }

    public PostContactUsEmail(email) {
        var deferred = this.$q.defer();

        let self = this;
        let url = "api/contactUs";

        let data = JSON.stringify(email);

        let onError = (error) => {
            deferred.reject(error);
        };

        return self.$http.post(url, data)
            .then((response) => {
                return response.data;
            }, onError);
    }
}
