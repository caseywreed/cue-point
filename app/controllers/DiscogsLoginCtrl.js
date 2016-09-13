"use strict";

app.controller("DiscogsLoginCtrl", function ($scope, $location, AuthFactory) {

    $scope.userVerifier = {
        key: ""
    }

    $scope.loginToDiscogs = function () {
        console.log("loginToDiscogs running")
        AuthFactory.discogsAuthCall()
    }

    // TO DO: MAKE AN IF/THEN FOR IF THE URL DOESN'T CONTAIN
    // THE AUTH KEY



})