///<reference path='../../typings/tsd.d.ts' />
import RegisterAMSController = require('./RegisterAMS/RegisterAMSController');
import MyProfileController = require('./MyProfile/MyProfileController');
import MyStationsController = require('./MyStations/MyStationsController');
import ComparePageController = require('./PageControllers/ComparePageController');
import NVD3Controller = require('./NVD3/NVD3Controller');
import AQIController = require('./AQI/AQIController');
import HeaderController = require('./Index/HeaderController');
import AppController = require('./Index/AppController');
import UserRegistrationController = require("./MyProfile/UserRegistrationController");
import WeatherController = require('./Weather/WeatherController');
import PreferencesController = require('./Preferences/PreferencesController');
import AboutUsController = require('./Footer/AboutUsController');

export = angular.module('controllers', [])
            .controller(RegisterAMSController.name, RegisterAMSController)
            .controller(MyProfileController.name, MyProfileController)
            .controller(MyStationsController.name, MyStationsController)
            .controller(ComparePageController.name, ComparePageController)
            .controller(NVD3Controller.name, NVD3Controller)
            .controller(AQIController.name, AQIController)
            .controller(HeaderController.name, HeaderController)
            .controller(AppController.name, AppController)
            .controller(UserRegistrationController.name, UserRegistrationController)
            .controller(WeatherController.name, WeatherController)
            .controller(PreferencesController.name, PreferencesController)
            .controller(AboutUsController.name, AboutUsController);
