'use strict';

const getUsers = require('./userendpoints').getUsers;
const getGroceryListItems = require('./grocerylistendpoints').getGroceryListItems;
const getGroceryItemStatus = require('./grocerylistendpoints').getGroceryItemStatus;
const getDistinctGroceryListItems = require('./grocerylistendpoints').getDistinctGroceryListItems;
const createGroceryListItem = require('./grocerylistendpoints').createGroceryListItem;
const updateGroceryListItem = require('./grocerylistendpoints').updateGroceryListItem;
const deleteGroceryListItem = require('./grocerylistendpoints').deleteGroceryListItem;
const getEmojiLookup = require('./grocerylistendpoints').getEmojiLookup;

const monkey_Action_doNothing = 0;
const monkey_Action_Insert = 1;
const monkey_Action_Update = 2;
const monkey_Action_Delete = 3;


const getMonkeyData = function (sqlDB, callback) {
    let returnparams = {
        users: [],
        groceryListItems: [],
        groceryItemStatus: [],
        distinctGroceryListItems: [],
        emojilookup: [],
    };

    new getUsers(sqlDB, (error, results) => {
        if (error) {
            callback(error, null);
            return;
        } else {
            returnparams.users = results;
            new getGroceryListItems(sqlDB, (error, results) => {
                if (error) {
                    callback(error, null);
                    return;
                } else {
                    returnparams.groceryListItems = results;
                    new getGroceryItemStatus(sqlDB, (error, results) => {
                        if (error) {
                            callback(error, null);
                            return;
                        } else {
                            returnparams.groceryItemStatus = results;
                            new getDistinctGroceryListItems(sqlDB, (error, results) => {
                                if (error) {
                                    callback(error, null);
                                    return;
                                } else {
                                    returnparams.distinctGroceryListItems = results;
                                    new getEmojiLookup(sqlDB, (error, results) => {
                                        if (error) {
                                            callback(error, null);
                                            return;
                                        } else {
                                            returnparams.emojilookup = results;
                                            callback(null, returnparams);
                                            return;
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    });
}

const updateMonkeyData = function (sqlDB, params, callback) {
    //console.log(params);
    var insertArray = params.filter((el) => (el.itemActionType === monkey_Action_Insert));
    var updateArray = params.filter((el) => (el.itemActionType === monkey_Action_Update));
    var deleteArray = params.filter((el) => (!el.itemNew && (el.itemActionType === monkey_Action_Delete)));


    //console.log(insertArray);
    //console.log(updateArray);
    //console.log(deleteArray);

    new createGroceryListItem(sqlDB, insertArray, (err) => {
        if (err) {
            callback(err);
            return;
        } else {
            new updateGroceryListItem(sqlDB, updateArray, (err) => {
                if (err) {
                    console.log(err);
                    callback(err);
                    return;
                } else {
                    new deleteGroceryListItem(sqlDB, deleteArray, (err) => {
                        if (err) {
                            callback(err);
                            return;
                        } else {
                            callback(null);
                            return;
                        }
                    })
                }
            })
        }
    })
}


module.exports = { getMonkeyData, updateMonkeyData };
