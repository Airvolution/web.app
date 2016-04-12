/// <reference path="../../../typings/tsd.d.ts" />

export = TrendsWidgetController;

class TrendsWidgetController {
    public static name = "TrendsWidgetController";

    public plotOptions;
    public plotData;

    public static $inject = [];

    public constructor() {
        this.plotOptions = {
            chart: {
                type: 'historicalBarChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 65,
                    left: 50
                },
                x: function (d) {
                    return d[0];
                },
                y: function (d) {
                    return d[1] / 100000;
                },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.1f')(d);
                },
                duration: 100,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 30,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10,
                    tickFormat: function (d) {
                        return d3.format(',.1f')(d);
                    }
                },
                tooltip: {
                    keyFormatter: function (d) {
                        return d3.time.format('%x')(new Date(d));
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };

        this.plotData = this.getPlotData();
    }

    public getPlotData() {
        return [{
                "key": "Quantity",
                "bar": true,
                "values": [
                    [1136005200000, 1271000.0],
                    [1138683600000, 1271000.0],
                    [1141102800000, 1271000.0],
                    [1143781200000, 0],
                    [1146369600000, 0],
                    [1149048000000, 0],
                    [1151640000000, 0],
                    [1154318400000, 0],
                    [1156996800000, 0],
                    [1159588800000, 3899486.0],
                    [1162270800000, 3899486.0],
                    [1164862800000, 3899486.0],
                    [1167541200000, 3564700.0],
                    [1170219600000, 3564700.0],
                    [1172638800000, 3564700.0],
                    [1175313600000, 2648493.0],
                    [1177905600000, 2648493.0],
                    [1180584000000, 2648493.0],
                    [1183176000000, 2522993.0],
                    [1185854400000, 2522993.0],
                    [1188532800000, 2522993.0],
                    [1191124800000, 2906501.0],
                    [1193803200000, 2906501.0],
                    [1196398800000, 2906501.0],
                    [1199077200000, 2206761.0],
                    [1201755600000, 2206761.0],
                    [1204261200000, 2206761.0],
                    [1206936000000, 2287726.0],
                    [1209528000000, 2287726.0],
                    [1212206400000, 2287726.0],
                    [1214798400000, 2732646.0],
                    [1217476800000, 2732646.0],
                    [1220155200000, 2732646.0],
                    [1222747200000, 2599196.0],
                    [1225425600000, 2599196.0],
                    [1228021200000, 2599196.0],
                    [1230699600000, 1924387.0],
                    [1233378000000, 1924387.0],
                    [1235797200000, 1924387.0],
                    [1238472000000, 1756311.0],
                    [1241064000000, 1756311.0],
                    [1243742400000, 1756311.0],
                    [1246334400000, 1743470.0],
                    [1249012800000, 1743470.0],
                    [1251691200000, 1743470.0],
                    [1254283200000, 1519010.0],
                    [1256961600000, 1519010.0],
                    [1259557200000, 1519010.0],
                    [1262235600000, 1591444.0],
                    [1264914000000, 1591444.0],
                    [1267333200000, 1591444.0],
                    [1270008000000, 1543784.0],
                    [1272600000000, 1543784.0],
                    [1275278400000, 1543784.0],
                    [1277870400000, 1309915.0],
                    [1280548800000, 1309915.0],
                    [1283227200000, 1309915.0]]
            }];
    }
}