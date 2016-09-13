"use strict";

app.controller("MainMenuCtrl", function ($scope, AuthFactory, DiscogsFactory) {

    $scope.userAuthToken = {}
    $scope.searchTerm = ""
    $scope.searchResultsArray = []
    $scope.bag = []

    $scope.getUserAccessTokens = () => {
        console.log("getting user access tokens")
        AuthFactory.getUserAuthToken(AuthFactory.getUid())
        .then( function (data) {
            let key = Object.keys(data)
            $scope.userAuthToken = data[key]
            console.log("$scope.userAuthToken from getUserAccessTokens", $scope.userAuthToken)
            $scope.findUserIdentity()
        })
    }

    $scope.findUserIdentity = () => {
        AuthFactory.findIdentity($scope.userAuthToken)
        .then( function (data) {
            console.log(data)
            AuthFactory.setUsername(data.username)
        })
    }

    $scope.mainMenuInit = () => {
        console.log("mainMenuInit running")
        $scope.getUserAccessTokens()
    }

    $scope.addRickAstley = () => {
        DiscogsFactory.addReleaseByNumber(249504, $scope.userAuthToken)
    }

    $scope.searchByCatNumber = () => {
        DiscogsFactory.searchByCatNumber($scope.searchTerm, $scope.userAuthToken)
        .then(function (searchResults) {
            $scope.searchResultsArray = searchResults.results
            console.log("searchResultsArray", $scope.searchResultsArray)
        })
    }

    $scope.addReleaseToBag = (releaseNumber) => {
        console.log("releaseNumber", releaseNumber)
        $scope.bag.push(releaseNumber)
        console.log("bag", $scope.bag)
    }

})