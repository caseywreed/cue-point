"use strict";

app.controller("BagCtrl", function ($scope, DiscogsFactory, AuthFactory) {

    $scope.bag = []
    $scope.bagDisplay = []
    $scope.transferedUserTokens = {}

    $scope.bagCtrlInit = () => {
        $scope.getBagFromDiscogsFactory()
        $scope.loadBagToBagDisplay()
    }

    $scope.getBagFromDiscogsFactory = () => {
        $scope.bag = DiscogsFactory.getBag()
        console.log("$scope.bag", $scope.bag)
    }

    $scope.loadBagToBagDisplay = () => {
        $scope.bag.forEach(function (release) {
            DiscogsFactory.searchByReleaseUrl(release.resource_url)
            .then( function (data) {
                data.thumb = release.thumb
                $scope.bagDisplay.push(data)
            })
        })
        console.log("$scope.bagDisplay", $scope.bagDisplay)
    }

    $scope.pushBagToDiscogs = () => {
        $scope.bagDisplay.forEach(function (release) {
            DiscogsFactory.addReleaseByNumber(release.resource_url)
        })
    }

})