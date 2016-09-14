"use strict";

app.controller("BagCtrl", function ($scope, DiscogsFactory, AuthFactory) {

    $scope.bag = []
    $scope.bagDisplay = []
    $scope.transferedUserTokens = {}

    $scope.bagCtrlInit = () => {
        $scope.transferedUserTokens = AuthFactory.getTransferableUserTokens()
        $scope.getBagFromDiscogsFactory()
        $scope.loadBagToBagDisplay()
    }

    $scope.getBagFromDiscogsFactory = () => {
        $scope.bag = DiscogsFactory.getBag()
        console.log("$scope.bag", $scope.bag)
    }

    $scope.loadBagToBagDisplay = () => {
        $scope.bag.forEach(function (release_url) {
            DiscogsFactory.searchByReleaseUrl(release_url)
            .then( function (release) {
                $scope.bagDisplay.push(release)
            })
        })
        console.log("$scope.bagDisplay", $scope.bagDisplay)
    }

    $scope.pushBagToDiscogs = () => {
        $scope.bag.forEach(function (release) {
            DiscogsFactory.addReleaseByNumber(release)
        })
    }

})