"use strict";

app.factory("AuthFactory", function ($q, $http, DiscogsCreds, $window, $location) {

    let _uid = null
    let user_agent = "CuePoint/0.01 +https://github.com/caseywreed/cue-point"
    let userTokens = {}
    let url = "https://api.discogs.com/oauth/request_token"

    let setUid = function (uid) {
        _uid = uid
        console.log("_uid", _uid)
    }

    let getUid = function () {
        return _uid
    }

    // GET TIMESTAMP UNIQUE

    let discogsAuthCall = () => {
        console.log("discogsAuthCall running")
        let timestamp = Date.now()
        return $q((resolve, reject) => {
            $http({
                method: "GET",
                url: "https://api.discogs.com/oauth/request_token?oauth_consumer_key="
                + DiscogsCreds.key +
                "&oauth_signature_method=PLAINTEXT&oauth_timestamp="
                + timestamp +
                "&oauth_nonce=33u0UT&oauth_version=1.0&oauth_signature="
                + DiscogsCreds.oauth_signature +
                "%26&oauth_callback=http://localhost:8080/#/redirect", //This is the ampersand at the end of the secret!
            })
            .success((data) => {
                console.log(data)
                setInitialUserTokens(data)
                $window.location.href = `https://discogs.com/oauth/authorize?oauth_token=${userTokens.oauth_token}`;
                resolve(data)
            })
            .error((error) => {
                reject(error)
            })
        })
    }

    //Leaving off here. Getting a 401 while trying to authorize
    //Has to be a better way to do this
    //Lots of progress, though

    let discogsVerifyCall = (userVerifyKey) => {
        console.log("discogsVerify running")
        console.log("userVerifyKey", userVerifyKey)
        console.log("userTokens object", userTokens)
        let timestamp = Date.now()
        return $q((resolve, reject) => {
            $http({
                method: "GET",
                url: "https://api.discogs.com/oauth/access_token?oauth_consumer_key=RLNRPrabhetprjFlZgUt&oauth_signature_method=PLAINTEXT&oauth_token="
                + userTokens.oauth_token +
                "&oauth_signature=kuwUTbYZgyBKdsqfpdIRTfvxIFwAWbMw%26&oauth_timestamp="
                + timestamp +
                "&oauth_nonce=33u0UT&oauth_version=1.0&oauth_verifier="
                + userVerifyKey
            })
            .success((data) => {
                console.log(data)
                resolve(data)
            })
            .error((error) => {
                reject(error)
            })
        })
    }

    // https://api.discogs.com/oauth/access_token?oauth_consumer_key=RLNRPrabhetprjFlZgUt&oauth_signature_method=PLAINTEXT&oauth_timestamp=1473357998&oauth_nonce=UeA0pl&oauth_version=1.0&oauth_signature=kuwUTbYZgyBKdsqfpdIRTfvxIFwAWbMw%26

// I KNOW this can be done better with .map()
// but I'll figure that out later

    let setInitialUserTokens = (tokens) => {
        let splitTokens = tokens.split("&")
        let tempTokenArray = []
        splitTokens.forEach( function (token) {
            let tokenValue = token.split("=")
            tempTokenArray.push(tokenValue[1])
        })
        userTokens.oauth_token_secret = tempTokenArray[0]
        userTokens.oauth_token = tempTokenArray[1]
        // userTokens.uid = some sort of get UID function
        sendTokensToFirebase(userTokens)
    }

    let sendTokensToFirebase = (pinObj) => {
        return $q((resolve,reject) => {
            $http.post('https://cue-point.firebaseio.com/users.json', userTokens)
            .then((data) => {
                resolve(data)
                }),(error) => {
                console.error(error)
                reject(error)
                }
        })
    }

    return {setUid, getUid, discogsAuthCall, discogsVerifyCall}

})