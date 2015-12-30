///<reference path="typings/tsd.d.ts"/>

define([
    'require',
    'angular',
    'app'
],function(requirejs, angular){
    'use strict';

    require(['domReady!'],function(document){
       angular.bootstrap(document,['app']);
    });
});

