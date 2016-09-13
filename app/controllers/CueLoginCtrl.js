"use strict";

app.controller("CueLoginCtrl", function ($scope, $window, $location, AuthFactory) {

    $scope.account = {
        email: "",
        password: ""
    }

    $scope.appTokens = null

    $scope.register = () => {
        console.log("you clicked register")
        AuthFactory.createUser({
            email: $scope.account.email,
            password: $scope.account.password
        })
        .then( (userData) => {
            console.log("userData", userData)
            $scope.login()
        }, (error) => {
            console.log(`Error creating user: ${error}`)
        })
    }

    $scope.login = () => {
        console.log("you clicked login")
        AuthFactory.loginUser($scope.account)
        .then( (data) => {
            if (data) {
            $window.location.href = "#/discogs-login"
            AuthFactory.setUid(data.uid)
            } else {
            console.log("inside login's ELSE block")
            $window.location.href = "#/login"
            }
        })
    }

    $scope.checkForAuthToken = function () {
        console.log("checkForAuthToken running")
        let url = $location.$$absUrl
        let splitUrl = url.split("&")
        let verifyToken = splitUrl[1].split("#")
        let userVerifyCode = verifyToken[0].split("=")
        let finalUserVerifyCode = userVerifyCode[1]
        AuthFactory.getTokensFromFirebase()
        .then(function (data) {
            $scope.appTokens = data.data
            let keyArray = Object.keys($scope.appTokens)
            let oauthToken = keyArray.map((key) => {
                return $scope.appTokens[key]
            })
            AuthFactory.deleteTokensFromFirebase()
            .then ( function () {
                AuthFactory.discogsVerifyCall(oauthToken[0], finalUserVerifyCode)
            })
        })
        $window.location.href = `/#/main`;
    }


})
