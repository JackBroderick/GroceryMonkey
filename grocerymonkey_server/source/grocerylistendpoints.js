'use strict';
const updateGroceryItemPhoto = require('./fileendpoints').updateGroceryItemPhoto;
const deleteGroceryListItemPhoto = require('./fileendpoints').deleteGroceryItemPhoto;
const dateFormat = require('dateformat');

const createGroceryListItem = function (sqlDB, params, callback) {
    if (params.length) {
        var sqlParams = [];
        const iSQL = 'INSERT INTO grocerylisttable (user_id, date, item, count, code, notes, status_id, requestor_id, photo, photo_location) VALUES '
            + '($user_id, $date, $item, $count, $code, $notes, $status_id, $requestor_id, $photo, $photo_location)';
        sqlDB.serialize(function () {
            var k = -1;
            for (var i = 0; i < params.length; i++) {
                let hasPhoto = params[i].itemPhoto;
                let photoLocationDT = dateFormat(new Date(), "yyyymmddHHMMssl");
                let itemPhotoURI = params[i].itemPhotoURI;
                sqlParams[i] = {
                    $user_id: params[i].itemUserID,
                    $date: params[i].itemDate,
                    $item: params[i].itemName,
                    $count: params[i].itemCount,
                    $code: params[i].itemCode,
                    $notes: params[i].itemNotes,
                    $status_id: params[i].itemStatusID,
                    $requestor_id: params[i].itemUserID,
                    $photo: hasPhoto,
                    $photo_location: hasPhoto ? photoLocationDT : null,
                };
                sqlDB.run(iSQL, sqlParams[i], function (error) {
                    if (error) {
                        console.log(error.message);
                        callback(error);
                        return;
                    } else {
                        k++;
                        const msg = "Row(s) inserted into grocerylisttable TABLE : " + this.changes;
                        if (hasPhoto) {
                            updateGroceryItemPhoto({ fileName: photoLocationDT, dataURI: itemPhotoURI }, (err) => { err ? console.log(err) : console.log('Item Photos Updated') });
                        }
                        console.log(msg);
                        if (k === (params.length - 1)) { callback(null); return;}
                    }
                })            
            }
        })
    } else { callback(null) }
}

const updateGroceryListItem = function (sqlDB, params, callback) {   
    if (params.length) {
        var sqlParams = [];
        const iSQL = 'UPDATE grocerylisttable SET user_id = $user_id, date = $date, item = $item, count = $count, code = $code, notes = $notes, status_id = $status_id'
            + ', photo = $photo WHERE grocery_list_id = $grocery_list_id';
        sqlDB.serialize(function () {
            var k = -1;
            for (var i = 0; i < params.length; i++) {
                let thisItemActive = params[i].itemStatusActive;
                let hasPhoto = params[i].itemPhoto;
                let thisItemPhoto = params[i].itemPhotoURI;
                sqlParams[i] = {
                    $grocery_list_id: params[i].itemID,
                    $user_id: params[i].itemUserID,
                    $date: params[i].itemDate,
                    $item: params[i].itemName,
                    $count: params[i].itemCount,
                    $code: params[i].itemCode,
                    $notes: params[i].itemNotes,
                    $status_id: params[i].itemStatusID,
                    $photo: params[i].itemPhoto,
                };
                sqlDB.run(iSQL, sqlParams[i], function (error) {
                    if (error) {
                        console.log(error.message);
                        callback(error);
                        return;
                    } else {
                        k++;
                        const msg = "Row(s) updated in grocerylisttable TABLE : " + this.changes;
                        console.log(msg);
                        if (!thisItemActive && hasPhoto) { deleteGroceryListItemPhoto(thisItemPhoto) }
                        if (k === (params.length-1)) { callback(null); return;}
                    }
                });
            }
        })
    } else { callback(null) };
}

const deleteGroceryListItem = function (sqlDB, params, callback) {
    if (params.length) {
        let sqlParams = [];
        const iSQL = 'DELETE FROM grocerylisttable WHERE grocery_list_id= $grocery_list_id';
        sqlDB.serialize(function () {
            let k = -1;
            for (var i = 0; i < params.length; i++) {
                let hasPhoto = params[i].itemPhoto;
                let photoLocation = params[i].itemPhotoURI;
                sqlParams[i] = {
                    $grocery_list_id: params[i].itemID,
                };
                sqlDB.run(iSQL, sqlParams[i], function (error) {
                    if (error) {
                        console.log(error.message);
                        callback(error);
                        return;
                    } else {
                        k++;
                        const msg = "Row(s) deleted in grocerylisttable TABLE : " + this.changes;
                        console.log(msg);
                        //delete the file
                        if (hasPhoto) { deleteGroceryListItemPhoto(photoLocation) }
                        if (k === (params.length - 1)) { callback(null); return}
                    }
                })
            }
        })
    } else { callback(null) };
}

const getDistinctGroceryListItems = function (sqlDB, callback) {
    const sSQL = 'SELECT DISTINCT(item), code FROM grocerylisttable ORDER BY item ASC';
    let returnparams = [];
    let rowcount = 0;
    sqlDB.each(sSQL, function (error, row) {
        if (error) {
            console.log(error.message);
            callback(error);
        } else {
            returnparams.push({
                item: row.item,
                code: row.code,
            });          
        }
        rowcount++;
    }, function(){
            const msg = "Row(s) returned from grocerylisttable: " + rowcount;
            console.log(msg);
            callback(null, returnparams);
        });
}

const getGroceryListItems = function (sqlDB, callback) {
    const sSQL = 'SELECT * FROM grocerylist WHERE is_active = true AND user_id > 0 ORDER BY date ASC';
    let returnparams = [];
    let rowcount = 0;
    sqlDB.each(sSQL, function (error, row) {
        if (error) {
            console.log(error.message);
            callback(error);
        } else {
            returnparams.push({
                grocery_list_id: row.grocery_list_id,
                user_id: row.user_id,
                username: row.username,
                date: row.date,
                item: row.item,
                count: row.count,
                code: row.code,
                notes: row.notes,
                status_id: row.status_id,
                status: row.status,           
                status_verb: row.status_verb,
                status_active: row.status_active,
                photo: row.photo,
                photo_location: row.photo_location,
            });
            rowcount++;
        }
    }, function () {
        const msg = "Row(s) returned from grocerylist: " + rowcount;
        console.log(msg);
        callback(null, returnparams);
    });
}

const getGroceryItemStatus = function (sqlDB, callback) {
    const sSQL = 'SELECT * from grocerystatus';
    let returnparams = [];
    let rowcount = 0; 
    sqlDB.each(sSQL, function (error, row) {
        if (error) {
            console.log(error.message);
            callback(error);
        } else {
            returnparams.push({
                statusID: row.status_id,
                status: row.status,
                action_new: row.action_new,
                action_sameuser: row.action_sameuser,
                action_type: row.action_type,
                status_verb: row.status_verb,
                status_active: row.status_active,
            });
            
        }
        rowcount++;
    }, function () {
        const msg = "Row(s) returned from grocerystatus: " + rowcount;
        console.log(msg);
        callback(null, returnparams);
    });
}


const updateGroceryItemStatus = function (sqlDB, params, callback) {
    const uSQL = 'UPDATE grocerystatus set status = $status, status_verb = $status_verb where status_id = $statusID';
    let sqlParams = {
        $status: params.status,
        $status_verb: params.status_verb,
        $statusID: params.statusID,
    }
    sqlDB.run(uSQL, sqlParams, function (error) {
        if (error) {
            console.log(error.message);
            callback(error);
        } else {
            const msg = "Row(s) updated in grocerystatus TABLE : " + this.changes;
            console.log(msg);
            callback(null);
        }
    })
}

const updateGroceryItem = function (sqlDB, params, callback) {
    const uSQL = 'UPDATE grocerylisttable set item = $itemUpdate, code = $code where item = $item';
    let sqlParams = {
        $item: params.item,
        $code: params.code,
        $itemUpdate: params.itemUpdate,

    }

    sqlDB.run(uSQL, sqlParams, function (error) {
        if (error) {
            console.log(error.message);
            callback(error);
        } else {
            const msg = "Row(s) updated in grocerylisttable TABLE : " + this.changes;
            console.log(msg);
            callback(null);
        }
    });

}

const deleteGroceryItem = function (sqlDB, params, callback) {
    const dSQL = "DELETE from grocerylisttable where item = $item and code = $code";
    let sqlParams = {
        $item: params.item,
        $code: params.code,
    }

    sqlDB.run(dSQL, sqlParams, function (error) {
        if (error) {
            console.log(error.message);
            callback(error);
        } else {
            const msg = "Row(s) deleted in grocerylisttable TABLE : " + this.changes;
            console.log(msg);
            callback(null);
        }
    });

}

const getEmojiLookup = function (sqlDB, callback){
    const lSQL = "select * from emojilookup";
    let returnparams = [];
    let rowcount = 0;
    sqlDB.each(lSQL, function (error, row) {
        if (error) {
            console.log(error.message);
            callback(error);
        } else {
            returnparams.push({
                code: row.code,
                key: row.key,
            });

        }
        rowcount++;
    }, function () {
            const msg = "Row(s) returned from emojilookup: " + rowcount;
            console.log(msg);
            callback(null, returnparams);
    });
}

const createEmojiLookup = function (sqlDB, params, callback) {
    const uSQL = 'INSERT INTO emojilookup (code, key) VALUES ($code, $key)';
    let sqlParams = {
        $code: params.code,
        $key: params.key,
    }
    console.log(params);

    deleteEmojiLookup(sqlDB, sqlParams, (error) => {
        sqlDB.run(uSQL, sqlParams, function (error) {
            if (error) {
                console.log(error.message);
                callback(error);
            } else {
                const msg = "Row(s) inserted into emojilookup TABLE : " + this.changes;
                console.log(msg);
                callback(null);
            }
        })
    })
}


const deleteEmojiLookup = function (sqlDB, params, callback) {
    const dSQL = 'DELETE FROM emojilookup where key = $key';
    let sqlParams = {
        $key: params.key,
    }

    sqlDB.run(dSQL, sqlParams, function (error) {
        if (error) {
            console.log(error.message);
            callback(error);
        } else {
            const msg = "Row(s) deleted from emojilookup TABLE : " + this.changes;
            console.log(msg);
            callback(null);
        }
    });
}

module.exports = {
    createGroceryListItem,
    updateGroceryListItem,
    deleteGroceryListItem,
    getGroceryListItems,
    getDistinctGroceryListItems,
    getGroceryItemStatus,
    updateGroceryItem,
    deleteGroceryItem,
    getEmojiLookup,
    createEmojiLookup,
    deleteEmojiLookup,
    updateGroceryItemStatus
};

