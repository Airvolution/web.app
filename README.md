# Airvolution Web Application

## About

Airvolution is an [AngularJS](https://angularjs.org/) with [TypeScript](https://www.typescriptlang.org/) web application for visualizing air quality data. The app provides an interactive [Leaflet](http://leafletjs.com/) map, [NVD3](http://nvd3.org/) data charts for plotting air metrics gathered by monitoring stations, and widgets for quickly identifying air quality trends. 

## How does it work?

Airvolution first identifies your physical location to determine how to show you your local air quality. The app request from the server data from the nearest monitoring station and uses this data to indicate information such as Green, Yellow, or Red, etc. air day. The app also displays air quality trends to show the you how your air quality has fluctuated over time. Fun facts such as where the best and worst air in your state and in the nation are also presented.

The app provides a series of tools which allow you to search for monitoring stations, create persistent groupings of stations, and define time ranges over which to display air quality data. These same tools can be used to configure CSV file downloads which can easily import into and spreadsheet application.

## Limitations

The Airvolution web app is not a stand-alone package, it requires the Airvolution server API and an Elastic Search deploy in order to work. 

## Requirements

This leverages mapping technology provided by Mapbox and Leaflet. You will need to obtain your own Mapbox API token and modify the MapFactory.ts file in order to generate the map tiles that make maps so pretty. The app expects three separate Mapbox layer styles to be available; you can either create three at [Mapbox.com](https://www.mapbox.com/) or modify the MapToolbarController to only display the number of tile options you have.

You can easily change where the app expects to find the deployed server and Elastic Search by modifying the server.js file located in the root directory. Just change the URI information for the variables apiDest and searchDest.

## Build

All the necessary dependencies can be installed with NPM and the app can be compiled with Grunt.

    npm install -g grunt
    npm install    
    grunt    

## Run

This app can run locally on your machine via NodeJS. 

    npm start
    






