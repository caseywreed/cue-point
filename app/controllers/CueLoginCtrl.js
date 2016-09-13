"use strict";

app.controller("CueLoginCtrl", function ($scope, $window, AuthFactory) {

    $scope.account = {
        email: "",
        password: ""
    }

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
            $window.location.href = "#/login"
            }
        })
    }




})
