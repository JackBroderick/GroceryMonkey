'use strict'

const fs = require('fs');
const path = require('path');
let userRoot, itemRoot


if (fs.existsSync(process.env.ROOT + "public")) {
    userRoot = path.join(process.env.ROOT, "public/images/users/");
    itemRoot = path.join(process.env.ROOT, "public/images/items/");
} else {
    userRoot = path.join(process.env.ROOT, "build/images/users/");
    itemRoot = path.join(process.env.ROOT, "build/images/items/");
}

const updateUserSelfie = function (params, callback) {
    let base64Image = params.dataURI.split(';base64,').pop();
    fs.writeFile(userRoot + params.userName + '.jpg', base64Image, { encoding: 'base64' }, function (err) {
        console.log('Selfie saved for user ID: ' + params.userName + ' in ' + userRoot);
        callback(err);
    })
}

const newUserPicture = function (userID, callback) {
    fs.copyFile(userRoot + 'new_monkey.jpg', userRoot + userID + '.jpg', function (err) {
            if (err) {
                console.log("Error copying new user photo");
                callback(err);
            } else {
                console.log('New picture file for user ID: ' + userID + " created in " + userRoot);
                callback(null)
            }
        }
    )
}

const updateGroceryItemPhoto = function (params, callback) {
    let base64Image = params.dataURI.split(';base64,').pop();
    fs.writeFile(itemRoot +  params.fileName + '.jpg', base64Image, { encoding: 'base64' }, function (err) {
        console.log('Grocery Item Photo ' + params.fileName + '.jpg Saved in ' + itemRoot);
        err ? callback(err) 
           : callback(null)
    })

}

const deleteGroceryItemPhoto = function (itemFileName) {
    fs.unlink(itemRoot + itemFileName + '.jpg', (err) => {
        if (err) { console.log(err) } else {console.log(itemFileName+'.jpg Removed from ' + itemRoot)}
    })
}


const deleteUserSelfie = function (userID) {
    fs.unlink(userRoot + userID + ".jpg", (err) => {
        err ? console.log(err) : console.log("Photo " + userID + ".jpg Removed from " + userRoot)
    })
}

module.exports = { updateUserSelfie, updateGroceryItemPhoto, deleteGroceryItemPhoto, newUserPicture, deleteUserSelfie };