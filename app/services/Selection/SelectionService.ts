///<reference path="../../../typings/tsd.d.ts" />

export = SelectionService;

class SelectionService {
    public static serviceName = 'selectionService';
    public static $inject = ['$log'];
    private currentSelection = [];
    constructor(
        private $log
    ) {
        // empty constructor
    }

    public addToSelection(stationID) {
        this.currentSelection.push(stationID);
    }

    public removeStationFromSelection(stationID) {
        let index = this.currentSelection.indexOf(stationID);
        if (index > -1) {
            this.currentSelection.splice(index, 1);
        }
    }

    public removeIndexFromSelection(index) {
        this.currentSelection.splice(index, 1);
    }

    public updateSelectionWith(stationID) {
        let index = this.currentSelection.indexOf(stationID);
        if (index > -1) {
            this.removeIndexFromSelection(index);
            this.$log.log('UPDATE: removing station from list: ' + stationID);
        } else {
            this.addToSelection(stationID);
            this.$log.log('UPDATE: adding station to list: ' + stationID);
        }
    }

    public setCurrentSelection(stationIDs) {
        this.currentSelection = stationIDs;
    }

    public getCurrentSelection() {
        this.$log.log('Selection Service returning current selection: ' + this.currentSelection);
        return this.currentSelection;
    }

}
