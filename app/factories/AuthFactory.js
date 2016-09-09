"use strict";

app.factory("AuthFactory", function ($q, $http, DiscogsCreds) {

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
                "%26", //This is the ampersand at the end of the secret!
            })
            .success((data) => {
                console.log(data)
                setInitialUserTokens(data)
                resolve(data)
            })
            .error((error) => {
                reject(error)
            })
        })
    }

    let discogsVerify = () => {

    }

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
    }

    return {setUid, getUid, discogsAuthCall}

})