/// <reference path="../../../typings/tsd.d.ts"/>

export = AlmanacViewController;

class AlmanacViewController {
    public static $inject = ['$scope','APIService'];
    constructor(private $scope, private APIService){
        APIService.getDailies(365).then((dailies)=>{
            $scope.dailies = _.map(dailies,(daily:any)=>{
                if(daily.date == "0001-01-01T00:00:00"){
                    daily.date = undefined;
                    return daily;
                }else{
                    return daily;
                }
            });
        });
    }
}
