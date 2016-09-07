"use strict";

app.factory("AuthFactory", function () {

    let _uid = null

    let setUid = function (uid) {
        _uid = uid
        console.log("_uid", _uid)
    }

    let getUid = function () {
        return _uid
    }

    return {setUid, getUid}

})