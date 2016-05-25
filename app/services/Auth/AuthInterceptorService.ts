/// <reference path="../../../typings/tsd.d.ts" />

export = AuthInterceptorService;

class AuthInterceptorService {
    public static serviceName = 'AuthInterceptorService';

    public static $inject = ['$q', '$location', '$localStorage'];

    constructor(private $q,
                private $location,
                private $localStorage) {
    }

    public request = (config)=> {
        config.headers = config.headers || {};

        var authData = this.$localStorage.authorizationData;
        if (authData && (config.url.indexOf('api') == 0 || config.url.indexOf('/api') == 0)) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    };
}
