///<reference path="../../../typings/tsd.d.ts" />

export = SelectionService;

class SelectionService {
    public static serviceName = 'selectionService';
    public static $inject = ['$log'];
    private currentStation = {};
    private currentStationSelection = [];
    private currentStationSelectionMap = {};
    private currentPollutantSelection = [];
    private currentWeatherSelection = [];
    constructor(
        private $log
    ) {
        this.getDefaultPollutantSelection();
    }

    private getDefaultPollutantSelection() {
        this.currentPollutantSelection = ['PM2.5', 'PM10', 'CO', 'CO2', 'NO2', 'OZONE'];
    }

    public removeIndexFromStationSelection(index) {
        this.currentStationSelection.splice(index, 1);
    }

    public removeIndexFromPollutantSelection(index) {
        this.currentPollutantSelection.splice(index, 1);
    }

    public removeIndexFromWeatherSelection(index) {
        this.currentWeatherSelection.splice(index, 1);
    }

    // Stations

    public addStationToSelection(marker) {
        this.currentStationSelection.push(marker);
        this.currentStationSelectionMap[marker.id] = marker.id;
    }

    public removeStationFromSelection(marker) {
        let index = this.currentStationSelection.indexOf(marker);
        if (index > -1) {
            this.currentStationSelection.splice(index, 1);
        }
        delete this.currentStationSelectionMap[marker.id];
    }

    public updateStationSelectionWith(marker) {
        let index = this.currentStationSelection.indexOf(marker);
        if (index > -1) {
            this.removeIndexFromStationSelection(index);
        } else {
            this.addStationToSelection(marker);
        }
    }

    public setCurrentStation(marker) {
        this.currentStation = marker;
    }

    public getCurrentStation() {
        return this.currentStation;
    }

    public setCurrentStationSelection(markers) {
        this.currentStationSelection = markers;
    }

    public getCurrentStationSelectionIds() {
        let ids = [];
        angular.forEach(this.currentStationSelection, function(value) {
            ids.push(value.id);
        });
        return ids;
    }

    public getCurrentStationSelection() {
        return this.currentStationSelection;
    }

    public getCurrentStationSelectionMap() {
        return this.currentStationSelectionMap;
    }

    // Parameters

    public addPollutantToSelection(kind) {
        this.currentPollutantSelection.push(kind);
    }

    public addWeatherToSelection(kind) {
        this.currentWeatherSelection.push(kind);
    }

    //public removePollutantFromSelection(kind) {
    //    let index = this.currentStationSelection.indexOf(marker);
    //    if (index > -1) {
    //        this.currentStationSelection.splice(index, 1);
    //    }
    //    delete this.currentStationSelectionMap[marker.id];
    //}
    //
    //public removeWeatherFromSelection(kind) {
    //    let index = this.currentStationSelection.indexOf(marker);
    //    if (index > -1) {
    //        this.currentStationSelection.splice(index, 1);
    //    }
    //    delete this.currentStationSelectionMap[marker.id];
    //}

    public updatePollutantSelectionWith(kind) {
        let index = this.currentPollutantSelection.indexOf(kind);
        if (index > -1) {
            this.removeIndexFromPollutantSelection(index);
        } else {
            this.addPollutantToSelection(kind);
        }
    }

    public setCurrentPollutantSelection(pollutants) {
        this.currentPollutantSelection = pollutants;
    }

    public getCurrentPollutantSelection() {
        return this.currentPollutantSelection;
    }

    public getCurrentWeatherSelection() {
        return this.currentWeatherSelection;
    }

}
