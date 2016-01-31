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

    public setCurrentSelection(stationIDs) {
        this.currentSelection = stationIDs;
    }

    public getCurrentSelection() {
        this.$log.log('Selection Service returning current selection: ' + this.currentSelection);
        return this.currentSelection;
    }

}
