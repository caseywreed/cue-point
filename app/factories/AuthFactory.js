"use strict";

app.factory("AuthFactory", function ($q, $http, DiscogsCreds) {

    let _uid = null
    let user_agent = "CuePoint/0.01 +https://github.com/caseywreed/cue-point"
    // let oauth_consumer_key = "RLNRPrabhetprjFlZgUt"
    // let oauth_signature = "kuwUTbYZgyBKdsqfpdIRTfvxIFwAWbMw"
    let oauth_token_secret = null
    let oauth_token = null

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
        console.log("DiscogsCreds", DiscogsCreds)
        let timestamp = Date.now()
        return $q((resolve, reject) => {
            $http({
                method: "GET",
                url: "https://api.discogs.com/oauth/request_token?oauth_consumer_key=" + DiscogsCreds.key + "&oauth_signature_method=PLAINTEXT&oauth_timestamp=" + timestamp + "&oauth_nonce=33u0UT&oauth_version=1.0&oauth_signature=" + DiscogsCreds.oauth_signature + "%26"
            })
            .success((data) => {
                // data = JSON.parse(data)
                console.log(data)
                resolve(data)
            })
            .error((error) => {
                reject(error)
            })
        })
    }

    return {setUid, getUid, discogsAuthCall}

})