"use strict";

app.controller("DiscogsLoginCtrl", function ($scope, $location, AuthFactory) {

    $scope.userVerifier = {
        key: ""
    }

    $scope.loginToDiscogs = function () {
        console.log("loginToDiscogs running")
        AuthFactory.discogsAuthCall()
    }

    // MAKE AN IF/THEN FOR IF THE URL DOESN'T CONTAIN
    // THE AUTH KEY

    $scope.checkForAuthToken = function () {
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