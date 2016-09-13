"use strict";

app.controller("MainMenuCtrl", function ($scope, AuthFactory) {

    $scope.userAuthToken = {}

    $scope.getUserAccessTokens = () => {
        console.log("getting user access tokens")
        AuthFactory.getUserAuthToken(AuthFactory.getUid())
        .then( function (data) {
            let key = Object.keys(data)
            $scope.userAuthToken = data[key]
            console.log("$scope.userAuthToken from getUserAccessTokens", $scope.userAuthToken)
        })
    }

    $scope.findUserIdentity = () => {
        AuthFactory.findIdentity($scope.userAuthToken)
        .then( function (data) {
            console.log(data)
        })
    }

})