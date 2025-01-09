
import { restAPIURL, xheader, ImMonkeyData_Users, ImMonkeyData_UpdateParams, ImConfig, ImMonkeyData_Lookup, ImEmojiLookup, ImMonkeyData_Status } from '../constants/constants';


export const validatePin = function (pin: string, callback: Function): void {
    fetch(restAPIURL + '/endpoints/authenticateuser', { method: 'POST', headers: xheader, body: JSON.stringify({ pin: pin }) })
        .then(res => res.json())
        .then((returnjson) => {
            callback(returnjson.success, returnjson.user);
        });
}

export const getAllMonkeyData = function (auth:boolean, callback: Function):void {
    fetch(restAPIURL + '/endpoints/getmonkeydata', { method: 'POST', headers: xheader, body: JSON.stringify({}) })
        .then(res => res.json())
        .then((returnjson) => {
            returnjson.success
                ? callback(returnjson.data)
                : callback({})
        })
}

export const updateUser = function (userParams: ImMonkeyData_Users, callback: Function): void {
    fetch(restAPIURL + '/endpoints/updateuser', { method: 'PUT', headers: xheader, body: JSON.stringify(userParams) })
        .then(res => res.json())
        .then((returnjson) => {
            returnjson.success
                ? callback(returnjson.user)
                : callback({})
        })
}

export const createUser = function (userParams: ImMonkeyData_Users, callback: Function): void {
    fetch(restAPIURL + '/endpoints/createuser', { method: 'POST', headers: xheader, body: JSON.stringify(userParams) })
        .then(res => res.json())
        .then((returnjson) => {
            callback(returnjson.success)
        })
}

export const deleteUser = function (userParams: ImMonkeyData_Users, callback: Function): void {
    fetch(restAPIURL + '/endpoints/deleteuser', { method: 'DELETE', headers: xheader, body: JSON.stringify(userParams) })
        .then(res => res.json())
        .then((returnjson) => {
            callback(returnjson.success)
        })
}

export const updateMonkeyData = function (userParams_state: ImMonkeyData_UpdateParams, callback: Function): void {
    fetch(restAPIURL + '/endpoints/updatemonkeydata', { method: 'PUT', headers: xheader, body: JSON.stringify(userParams_state) })
        .then(res => res.json())
        .then((returnjson) => {
            returnjson.success
                ? callback(true)
                : callback(false)
        })

}

export const getBananaWinnerHistory = function (callback: Function): void {
    fetch(restAPIURL + '/endpoints/getbananawinnerhistory', { method: 'POST', headers: xheader, body: '' })
        .then(res => res.json())
        .then((returnjson) => {
            returnjson.success
                ? callback(returnjson.data)
                : callback({})
        })
}

export const getBananaMoochHistory = function (callback: Function): void {
    fetch(restAPIURL + '/endpoints/getbananamoochhistory', { method: 'POST', headers: xheader, body: '' })
        .then(res => res.json())
        .then((returnjson) => {
            returnjson.success
                ? callback(returnjson.data)
                : callback({})
        })
}

export const updateUserSelfie = function (userName: string, dataURI: any, callback:Function): void {
    let params = { production: restAPIURL.length ? false: true, userName: userName, dataURI: dataURI };
    fetch(restAPIURL + '/endpoints/updateuserselfie', { method: 'POST', headers: xheader, body: JSON.stringify(params) })
        .then(res => res.json())
        .then((returnjson => {
            callback(returnjson.success);
        }))
}

export const getConfigInfo = function (callback: Function): void {
    fetch(restAPIURL + '/endpoints/getconfiginfo', { method: 'POST', headers: xheader })
        .then(res => res.json())
        .then((returnjson => {
            returnjson.success
                ? callback(returnjson.data)
                : callback({})
        }))
}


export const updateConfigInfo = function (configParams_state: ImConfig, callback: Function): void {
    fetch(restAPIURL + '/endpoints/updateconfiginfo', { method: 'PUT', headers: xheader, body: JSON.stringify(configParams_state) })
        .then(res => res.json())
        .then((returnjson) => {
            returnjson.success
                ? callback(true)
                : callback(false)
        })

}

export const getUsers = function (callback: Function): void {
    fetch(restAPIURL + '/endpoints/getusers', { method: 'POST', headers: xheader })
        .then(res => res.json())
        .then((returnjson => {
            returnjson.success
                ? callback(returnjson.data)
                : callback({})
        }))
}

export const updateGroceryItem = function (params: ImMonkeyData_Lookup, callback: Function): void {
    fetch(restAPIURL + '/endpoints/updategroceryitem', { method: 'PUT', headers: xheader, body: JSON.stringify(params) })
        .then(res => res.json())
        .then((returnjson) => {callback(returnjson.success)})
}

export const deleteGroceryItem = function (params: ImMonkeyData_Lookup, callback: Function): void {
    fetch(restAPIURL + '/endpoints/deletegroceryitem', { method: 'DELETE', headers: xheader, body: JSON.stringify(params) })
        .then(res => res.json())
        .then((returnjson) => { callback(returnjson.success) })
}

export const getEmojiLookup = function (callback: Function): void {
    fetch(restAPIURL + '/endpoints/getemojilookup', { method: 'POST', headers: xheader })
        .then(res => res.json())
        .then((returnjson => {
            returnjson.success
                ? callback(returnjson.data)
                : callback({})
        }))
}

export const createEmojiLookup = function (params:ImEmojiLookup, callback: Function): void {
    fetch(restAPIURL + '/endpoints/createemojilookup', { method: 'PUT', headers: xheader, body: JSON.stringify(params) })
        .then(res => res.json())
        .then((returnjson) => {
            callback(returnjson.success)
        })
}

export const deleteEmojiLookup = function (params: ImEmojiLookup, callback: Function): void {
    fetch(restAPIURL + '/endpoints/deleteemojilookup', { method: 'DELETE', headers: xheader, body: JSON.stringify(params) })
        .then(res => res.json())
        .then((returnjson) => { callback(returnjson.success) })
}

export const updateGroceryItemStatus = function (params: ImMonkeyData_Status, callback: Function): void {
    fetch(restAPIURL + '/endpoints/updategroceryitemstatus', { method: 'PUT', headers: xheader, body: JSON.stringify(params) })
        .then(res => res.json())
        .then((returnjson) => { callback(returnjson.success) })
}
