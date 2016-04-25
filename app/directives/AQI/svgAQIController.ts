/// <reference path="../../../typings/tsd.d.ts"/>

export = SVGAQIController;

//controls animation on bubble indicator
const X_BASE = 44;
const OFFSET_FACTOR = 4.40;
class SVGAQIController {
    public aqi;
    public category;
    public offset;
    static $inject = ['$scope'];
    constructor(private $scope){
        this.category = 'green';
        this.offset = X_BASE;
        var self = this;
        var aqi = $scope.$watch('ctrl.aqi', (newVal)=> {
            if(newVal === undefined){
                return;
            }
            self.update(newVal);
        });

        $scope.$on('$destroy',()=>{
            aqi();
        });
    }

    public update(aqi){
        if(aqi === undefined) {
            return;
        }
        var cat = this.getCategory(aqi);
        this.category = cat.category;
        var percent = this.getPercentOfCategory(cat,aqi);
        percent = percent < 0 ? 0 : percent;
        percent = percent > 100 ? 100 : percent;
        this.offset = X_BASE + percent * OFFSET_FACTOR;
    }

    public getCategory(aqi){
        if(aqi <= 50){
            return {category: 'green', min:0.0,max:50.0};
        }else if (aqi <= 100){
            return {category:'yellow', min:51.0, max: 100.0};
        }else if (aqi <= 150){
            return {category: 'orange', min:101.0, max: 150.0};
        }else if (aqi <= 200){
            return {category: 'red', min: 151.0, max: 200.0};
        }else if (aqi <=300){
            return {category: 'purple', min: 201.0, max: 300.0};
        }else{
            return {category: 'maroon',min:300.0,max:500.0};
        }
    }

    public getPercentOfCategory(category,aqi){
        return (aqi - category.min)/(category.max - category.min) * 100;
    }
}
