"use strict";

app.controller("DiscogsLoginCtrl", function ($scope, $location, AuthFactory) {

    $scope.userVerifier = {
        key: ""
    }

    $scope.loginToDiscogs = function () {
        console.log("loginToDiscogs running")
        AuthFactory.discogsAuthCall()
    }

})