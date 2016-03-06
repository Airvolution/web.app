///<reference path="../../../typings/tsd.d.ts" />

export = SelectionService;

class SelectionService {
    public static serviceName = 'selectionService';
    public static $inject = ['$log'];
    private currentStation;
    private currentStationSelection = [];
    private currentStationSelectionMap = {};
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
            this.$log.log('UPDATE: removing station from list: ' + marker);
        } else {
            this.addStationToSelection(marker);
            this.$log.log('UPDATE: adding station to list: ' + marker);
        }
    }

    public setCurrentStation(marker) {

    }

    public getCurrentStation() {
        return this.currentStation;
    }

    public setCurrentStationSelection(markers) {
        this.currentStationSelection = markers;
    }

    public getCurrentStationSelection() {
        this.$log.log('Selection Service returning current selection: ' + this.currentStationSelection);
        return this.currentStationSelection;
    }

    public getCurrentStationSelectionMap() {
        return this.currentStationSelectionMap;
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
