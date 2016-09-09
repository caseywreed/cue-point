"use strict";

app.controller("LoginCtrl", function ($scope, AuthFactory) {

    $scope.loginToDiscogs = function () {
        console.log("loginToDiscogs running")
        AuthFactory.discogsAuthCall()
    }


})