/// <reference path="../../../typings/tsd.d.ts" />

export = MapToolboxController;

class MapToolboxController {
    public expanded;
    public showDetails;
    public clusters;
    public static $inject = ['$scope','$state', 'mapFactory'];
    constructor(
        private $scope,
        private $state,
        private mapFactory
    ) {
        this.showDetails = true;
        this.clusters = [];
        this.convertMapLayersToArray(mapFactory.createMapLayers().overlays);
    }

    private convertMapLayersToArray(layers) {
        let self = this;
        angular.forEach(layers, function(value, key) {
            self.clusters.push({
                id: key,
                name: value.name,
                visible: value.visible
            });
        });
    }

    public toggleDetails() {
        this.showDetails = !this.showDetails;
    }

    public toggleExpand() {
        this.expanded = !this.expanded;
    }

    public toggleMap(mode) {
        this.$scope.$parent.mode = mode;
    }

    public getMarkerNames() {
        return this.mapFactory.getMarkerNames();
    }

    public centerMapOnLocation() {
        this.$scope.$parent.centerOnLocation = !this.$scope.$parent.centerOnLocation;
    }

    public togglePlot() {
        this.$scope.$parent.togglePlot = !this.$scope.$parent.togglePlot;
    }

    public download() {
        this.$scope.$parent.downloadPlot = !this.$scope.$parent.downloadPlot;
    }

    public centerMapOnSelectedMarker() {
        this.$scope.$parent.centerOnMarker = !this.$scope.$parent.centerOnMarker;
    }

    public toggleCluster(cluster) {
        console.log('cluster: ' + cluster);
        this.$scope.$parent.toggleCluster = cluster.id;
    }

    public showAllClusters() {
        this.$scope.$parent.showAllClusters = !this.$scope.$parent.showAllClusters;
        angular.forEach(this.clusters, function (cluster) {
            cluster['visible'] = true;
        });
    }

    public hideAllClusters() {
        this.$scope.$parent.hideAllClusters = !this.$scope.$parent.hideAllClusters;
        angular.forEach(this.clusters, function (cluster) {
            cluster['visible'] = false;
        });
    }
}
