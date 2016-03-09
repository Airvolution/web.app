///<reference path="../../../typings/tsd.d.ts" />

export = SelectionService;

class SelectionService {
    public static serviceName = 'selectionService';
    public static $inject = ['$log'];
    private currentStation = {};
    private currentStationSelection = [];
    private currentStationSelectionMap = {};
    private currentPollutantSelection;
    private pollutantSelectionMap;
    private currentWeatherSelection;
    constructor(
        private $log
    ) {
        this.currentPollutantSelection = this.getDefaultPollutantSelection();
        this.pollutantSelectionMap = this.getPollutantOptionsMap();
    }

    private getDefaultPollutantSelection() {
        return [
            {
                kind: 'PM2.5',
                name: 'Particulate Matter 2.5',
                selected: false
            },
            {
                kind: 'PM10',
                name: 'Particulate Matter 10',
                selected: false
            },
            {
                kind: 'CO',
                name: 'Carbon Monoxide',
                selected: false
            },
            {
                kind: 'CO2',
                name: 'Carbon Dioxide',
                selected: false
            },
            {
                kind: 'NO2',
                name: 'Nitrogen Dioxide',
                selected: false
            },
            {
                kind: 'O3',
                name: 'Ozone',
                selected: false
            }
        ];
    }

    private getPollutantOptionsMap() {
        return {
            'PM2.5': 0,
            'PM10': 1,
            'CO': 2,
            'CO2': 3,
            'NO2': 4,
            'O3': 5
        };
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
            this.$log.log('UPDATE: removing station from list: ' + marker);
        } else {
            this.addStationToSelection(marker);
            this.$log.log('UPDATE: adding station to list: ' + marker);
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
        this.$log.log('Selection Service returning current selection: ' + this.currentStationSelection);
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
        let key = this.pollutantSelectionMap[kind];
        this.currentPollutantSelection[key].selected = !this.currentPollutantSelection[key].selected;
        //let index = this.currentPollutantSelection.indexOf(kind);
        //if (index > -1) {
        //    this.removeIndexFromPollutantSelection(index);
        //    this.$log.log('UPDATE: removing parameter from list: ' + kind);
        //} else {
        //    this.addPollutantToSelection(kind);
        //    this.$log.log('UPDATE: adding parameter to list: ' + kind);
        //}
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
