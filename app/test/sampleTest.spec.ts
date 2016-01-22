///<reference path="../../typings/tsd.d.ts" />

///<amd-dependency path="../../test" />
var test;
var angular = require('angular');
describe('sample tests',()=>{
    beforeEach(()=>{
        module('test');
    });
   it('does cool stuff',()=>{
        console.log('I ran!');
   }) ;
});