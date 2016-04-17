/// <reference path="../../../typings/tsd.d.ts" />

export = RankingWidgetController;

class RankingWidgetController {
    public static name = "RankingWidgetController";

    public someValue;
    public loading;

    public static $inject = ['$scope', '$log'];
    public constructor (
        private $scope,
        private $log
    ) {
        let self = this;
        let unregisterDailies = $scope.$watch('dailies', (dailies) => {
            self.someFunction(dailies);
        });

        $scope.$on("$destroy", () => {
            unregisterDailies();
        });
    }

    public someFunction(dailies) {
        if (!dailies) {
            this.loading = true;
            return;
        }

        this.someValue = dailies[0].avgAQI;

        this.loading = false;
    }
}
