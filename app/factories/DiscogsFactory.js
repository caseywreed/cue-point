"use strict";

app.factory("DiscogsFactory", function ($q, $http, AuthFactory) {

    let addReleaseByNumber = (releaseNumber, userAuthToken) => {
        console.log("releaseNumber", releaseNumber)
        let timestamp = Date.now()
        return $q((resolve,reject) => {
            $http.post(`https://api.discogs.com/users/${AuthFactory.getUsername()}/collection/folders/1/releases/${releaseNumber}?oauth_consumer_key=RLNRPrabhetprjFlZgUt&oauth_token=${userAuthToken.oauth_token}&oauth_signature_method=PLAINTEXT&oauth_timestamp=${timestamp}&oauth_nonce=yqg53e&oauth_version=1.0&oauth_signature=kuwUTbYZgyBKdsqfpdIRTfvxIFwAWbMw%26${userAuthToken.oauth_token_secret}`)
            .success((data) => {
                console.log(data)
                resolve(data)
            })
            .error( (error) => {
                console.error(error)
                reject(error)
            })
        })
    }

    return {addReleaseByNumber}

})