/// <reference path="../../../../typings/tsd.d.ts" />

import MyProfileDirective = require("./myProfileDirective");
import UserPreferencesDirective = require("./userPreferencesDirective");
import UserLoginRegisterDirective = require("./userLoginRegisterDirective");
import UserLoginRegisterController = require("./userLoginRegisterController");
export = angular.module('app.directives.config.user',[])
    .directive(MyProfileDirective.htmlName, MyProfileDirective.create)
    .directive(UserPreferencesDirective.htmlName, UserPreferencesDirective.create)
    .directive(UserLoginRegisterDirective.htmlName, UserLoginRegisterDirective.create);
