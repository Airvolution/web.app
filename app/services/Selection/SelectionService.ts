///<reference path="../../../typings/tsd.d.ts" />

export = SelectionService;

class SelectionService {
    public static serviceName = 'selectionService';
    public static $inject = ['$log'];
    private currentStationSelection = [];
    private currentParameterSelection = [];
    constructor(
        private $log
    ) {
        // empty constructor
    }

    public removeIndexFromStationSelection(index) {
        this.currentStationSelection.splice(index, 1);
    }

    public removeIndexFromParameterSelection(index) {
        this.currentParameterSelection.splice(index, 1);
    }

    // Stations

    public addStationToSelection(stationID) {
        this.currentStationSelection.push(stationID);
    }

    public removeStationFromSelection(stationID) {
        let index = this.currentStationSelection.indexOf(stationID);
        if (index > -1) {
            this.currentStationSelection.splice(index, 1);
        }
    }

    public updateStationSelectionWith(stationID) {
        let index = this.currentStationSelection.indexOf(stationID);
        if (index > -1) {
            this.removeIndexFromStationSelection(index);
            this.$log.log('UPDATE: removing station from list: ' + stationID);
        } else {
            this.addStationToSelection(stationID);
            this.$log.log('UPDATE: adding station to list: ' + stationID);
        }
    }

    public setCurrentStationSelection(stationIDs) {
        this.currentStationSelection = stationIDs;
    }

    public getCurrentStationSelection() {
        this.$log.log('Selection Service returning current selection: ' + this.currentStationSelection);
        return this.currentStationSelection;
    }

    // Parameters

    public addParameterToSelection(kind) {
        this.currentParameterSelection.push(kind);
    }

    public updateParameterSelectionWith(kind) {
        let index = this.currentParameterSelection.indexOf(kind);
        if (index > -1) {
            this.removeIndexFromParameterSelection(index);
            this.$log.log('UPDATE: removing parameter from list: ' + kind);
        } else {
            this.addParameterToSelection(kind);
            this.$log.log('UPDATE: adding parameter to list: ' + kind);
        }
    }

    public setCurrentParameterSelection(parameters) {
        this.currentParameterSelection = parameters;
    }

    public getCurrentParameterSelection() {
        return this.currentParameterSelection;
    }

}
