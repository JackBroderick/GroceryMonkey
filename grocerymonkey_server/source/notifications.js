const getUsers = require('./userendpoints').getUsers;
const getConfig = require('./userendpoints').getConfigInfo;
const emoji = require('node-emoji');
const fs = require('fs');
const path = require('path');
const currentImageName = 'current_grocerylist.png';
let userPicLoc, itemPicLoc, monkeyPicLoc;

if (fs.existsSync(process.env.ROOT + 'public')) {
    userPicLoc = path.join(process.env.ROOT, 'public/images/users/');
    itemPicLoc = path.join(process.env.ROOT, 'public/images/items/');
    monkeyPicLoc = path.join(process.env.ROOT, 'public/images/monkey/');
} else {
    userPicLoc = path.join(process.env.ROOT, 'build/images/users/');
    itemPicLoc = path.join(process.env.ROOT, 'build/images/items/');
    monkeyPicLoc = path.join(process.env.ROOT, 'build/images/monkey/');
}

const sendNotifications = function (sqlDB, monkeyData, callback) {
    new getConfig(sqlDB, (error, configResults) => {
        if (error) {
            console.log('Error getting configuration info: Cannot send notifications');
            return;
        } else {
            if (configResults[0].notifications) {
                new getUsers(sqlDB, (error, userResults) => {
                    if (error) {
                        console.log('Error getting User List: Cannot send notifications');
                        return;
                    } else {

                        function patternFit(candidate) {
                            let candidate_check = candidate.trim();
                            if (!candidate_check.includes('@') && candidate_check.length > 0 ) {
                                candidate_check = candidate_check + '@vzwpix.com';
                            }
                            let addressParse1 = candidate_check.split('@',2)[0];
                            if (addressParse1.length>1) {
                                let addressParse2 = candidate_check.split('.',2)[0];
                                if (addressParse2.length>1) {
                                    return candidate_check;
                                } else {
                                    return '';
                                }
                            } else {
                                return '';
                            }
                        }

                        var userList = userResults.filter((el) => (el.notify)).map((e) => ([patternFit(e.email),patternFit(e.sms)])).flat();
                        if (userList.length) {
                            sendMail(userList, monkeyData, configResults[0]);
                            if (callback) { callback() };
                        } else {
                            console.log('No users to notify')
                        }
                    }
                })
            }
        }
    })
}

const sendMail = function (userList, monkeyParams, configData) {
    const email = require('emailjs');
    //const appURL = configData.appURL;
    //const monkeyData = monkeyParams.monkeyData;

    var SMTPClient = new email.SMTPClient({
        user: configData.emailUserName,
        password: configData.emailUserPassword,
        host: configData.smtpServer,
        port: configData.portNumber,
        domain: configData.domain,
        ssl: (configData.ssl !== 0),
    });

    var monkeyTitle = emoji.emojify(':monkey_face:') + ' GROCERY MONKEY'

    var message = new email.Message({
        from: configData.emailAlias,
        text: monkeyParams.userName + ' is the Grocery Monkey!',
        subject: monkeyTitle,
        to: userList,
        attachment: [
            { path: itemPicLoc + currentImageName, type: 'image/png', inline: true, name: 'Monkey List' },
        ]
    });

    monkeyUpdateImage(monkeyParams, () => {
        SMTPClient.send(message, function (err, message) {
            err ? console.log('Error sending notifications to ' + userList + ' ' + err.message)
                : console.log('Notifications sent to ' + message.header.to);
        });
    });
}

const monkeyUpdateImage = function (monkeyParams, callback) {
    const nodeHtmlToImage = require('node-html-to-image');
    const fs = require('fs');
    const header = '<html><body><div style="text-align:center; background-color:WhiteSmoke ; font-size:20px">';
    const footer = '<br/></div></body></html>';
    const baseline = '<h1 style="font-bold:true">GROCERY MONKEY UPDATE</h1>';

    const userImage = fs.readFileSync(userPicLoc + monkeyParams.userID + '.jpg')
    const userBase64 = new Buffer.from(userImage).toString('base64');
    const backGroundImage = fs.readFileSync(monkeyPicLoc + 'bananas.png');
    const backGroundImageBase64 = new Buffer.from(backGroundImage).toString('base64');

    function quantHTML(quant) {
        if (quant) {
            return ' (' + quant + ')';
        } else {
            return '';
        }
    }

    function commentsHTML(comment, activeStatus) {
        if (comment && activeStatus) {
            return '<br/><span>' + comment + '</span>';
        } else {
            return '';
        }
    }

    function getFontColor(activeStatus) {
        if (activeStatus) {
            return "black";
        } else {
            return "green";
        }
    }

    function addCheck(activeStatus) {
        if (!activeStatus) {
            return emoji.emojify(':heavy_check_mark:') + ' '
        } else {
            return '';
        }
    }

    const userImageURI = 'data:image/jpeg;base64,' + userBase64;
    //const userLine = '<div text-align="center"><img width="300px" height="300px" style="border-radius:50%" src="{{userImage}}"/></div>';
    const userLine = '<div style="background-image:url(data:image/png;base64,' + backGroundImageBase64 +
        ')" text-align="center"><br/><img width="300px" height="300px" style="border-radius:50%;border:12px solid white" src="' +  userImageURI + '"/><br/><br/></div>';

    const monkeyActions = monkeyParams.monkeyData.map((el, i) => (
        '<div><h1 style="color:' + getFontColor(el.itemStatusActive) + '">' + addCheck(el.itemStatusActive) + el.itemUserName + ' ' + el.itemStatusVerb +
        ' ' + emoji.emojify(el.itemCode) + ' ' + el.itemName + quantHTML(el.itemCount) + commentsHTML(el.itemNotes, el.itemStatusActive) + '</h1></div>'
    )).join('');


    const monkeyHTML = header +  userLine + baseline + '<hr>' + monkeyActions + footer
    

    nodeHtmlToImage({
        output: itemPicLoc + currentImageName,
        html: monkeyHTML,
        content: {userImage:userImageURI}
    })
        .then(() => { callback() })
}


module.exports = { sendNotifications };