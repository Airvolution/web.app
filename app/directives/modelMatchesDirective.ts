/// <reference path="../../typings/tsd.d.ts" />
export = ModelMatchesDirective;

class ModelMatchesDirective implements ng.IDirective {
    public static htmlName = "modelMatches";

    public restrict = "A";
    public require = "ngModel";
    public scope = {
        otherField: "=modelMatches"
    };
    public link = ($scope, $element, $attrs, ngModel)=> {
        ngModel.$validators.matches = function(modelValue) {
            return modelValue == $scope.otherField;
        };

        $scope.$watch("otherField", function() {
            ngModel.$validate();
        });
    };

    public static create() {
        return new ModelMatchesDirective();
    }

    constructor() {
    }
}