/// <reference path="../../../../typings/tsd.d.ts" />

import MyProfileDirective = require("./myProfileDirective");
import UserPreferencesDirective = require("./userPreferencesDirective");
import UserLoginRegisterDirective = require("./userLoginRegisterDirective");
import UserResetPasswordDirective = require('./userResetPasswordDirective');
import PasswordResetModalDirective = require("./passwordResetModalDirective");
import EmailConfirmedModalDirective = require("./emailConfirmedModalDirective");
import UserInitialsDirective = require("./userInitialsDirective");

export = angular.module('app.directives.config.user',[])
    .directive(MyProfileDirective.htmlName, MyProfileDirective.create)
    .directive(UserPreferencesDirective.htmlName, UserPreferencesDirective.create)
    .directive(UserLoginRegisterDirective.htmlName, UserLoginRegisterDirective.create)
    .directive(UserResetPasswordDirective.htmlName, UserResetPasswordDirective.create)
    .directive(PasswordResetModalDirective.htmlName, PasswordResetModalDirective.create)
    .directive(EmailConfirmedModalDirective.htmlName, EmailConfirmedModalDirective.create)
    .directive(UserInitialsDirective.htmlName, UserInitialsDirective.create);
