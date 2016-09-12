"use strict";

app.controller("LoginCtrl", function ($scope, $location, AuthFactory) {

    $scope.userVerifier = {
        key: ""
    }

    $scope.loginToDiscogs = function () {
        console.log("loginToDiscogs running")
        AuthFactory.discogsAuthCall()
    }

    $scope.discogsVerify = function () {
        console.log("discogsVerify running")
        AuthFactory.discogsVerifyCall($scope.userVerifier.key)
    }

    // RUN THIS AS AN INIT EVERY TIME LOGIN PAGE LOADS!

    $scope.checkForAuthToken = function () {
        // GRAB AUTH TOKEN
        // SEND THE AUTH TOKEN TO STEP 4 OF DISCOGS LOGIN
        // WITH DISCOGS VERIFY
        console.log("checkForAuthToken running")
        console.log("$location", $location)
        let url = $location.$$absUrl
        let splitUrl = url.split("&")
        let verifyToken = splitUrl[1].split("#")
        let userVerifyCode = verifyToken[0].split("=")
        let finalUserVerifyCode = userVerifyCode[1]
        console.log("finalUserVerifyCode", finalUserVerifyCode)
        AuthFactory.discogsVerifyCall(finalUserVerifyCode)
    }

})