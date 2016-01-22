///<reference path="../../typings/tsd.d.ts" />

describe('sample tests',()=>{
    beforeEach(()=>{
        angular.module('test');
    });
   it('does cool stuff',()=>{
        console.log('I ran!');
   }) ;
    it('fails on occasion',()=>{
        expect(1).toEqual(0);
    })
});