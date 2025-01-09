const getUsers = require('./userendpoints').getUsers;
const getConfig = require('./userendpoints').getConfigInfo;
const emoji = require('node-emoji');
const fs = require('fs');
const path = require('path');
let userPicLoc;

if (fs.existsSync(process.env.ROOT + "public")) {
    userPicLoc = path.join(process.env.ROOT, "public/images/users/");
} else {
    userPicLoc = path.join(process.env.ROOT, "build/images/users/");
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

                        function patternFit(candidate){
                            let addressParse1 = candidate.split('@');
                            if (addressParse1.length>1) {
                                let addressParse2 = candidate.split('.');
                                if (addressParse2.length>1) {
                                    return candidate;
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
    const username = configData.emailUserName;
    const pword = configData.emailUserPassword;
    const smtpserver = configData.smtpServer;
    const portnumber = configData.portNumber;
    const groceryMonkeyemail = configData.emailAlias;
    const appURL = configData.appURL;
    const email_domain = configData.domain;
    const email_ssl = (configData.ssl !== 0);
    const monkeyData = monkeyParams.monkeyData;

    var server = new email.SMTPClient({
        user: username,
        password: pword,
        host: smtpserver,
        port: portnumber,
        domain: email_domain,
        ssl: email_ssl,
    });

    var monkeyTitle = emoji.emojify(':monkey_face:') + ' GROCERY MONKEY!'
    const cr = '\r';
    monkeyTitle = monkeyTitle + cr + cr + monkeyParams.userName + ' is the monkey' + cr + cr;

    var monkeyBody = '';
    var monkeyList = '';

    for (var i = 0; i < monkeyData.length; i++) {        
        monkeyBody = monkeyBody + '   => ' + monkeyData[i].itemUserName + ' ' + monkeyData[i].itemStatusVerb + ' ' + monkeyData[i].itemName;
        if (monkeyData[i].itemNotes.length) {monkeyBody = monkeyBody + ' - (' + monkeyData[i].itemNotes + ')'}
        monkeyBody = monkeyBody + cr;

        if (monkeyData[i].itemStatusActive) {
            var itemTruncate = (((monkeyData[i].itemName.length < 15) ? monkeyData[i].itemName : (monkeyData[i].itemName.substring(0, 15) + '...')));
            var itemCount = (monkeyData[i].itemCount ? '(' + monkeyData[i].itemCount + ') ' : '');
            var monkeyList = monkeyList + '        ' + itemCount + itemTruncate + cr;
        } 
    }

    if (monkeyList.length) {
        var monkeyBody_Plus = 'GROCERY LIST...' + cr + monkeyList + cr + cr + 'MONKEY BUSINESS...' + cr + monkeyBody;
    } else {
        var monkeyBody_Plus = 'MONKEY BUSINESS...' + cr + monkeyBody;
    }

    var monkeyBody_Final = monkeyBody_Plus

    var message = new email.Message({
        text: monkeyBody_Final,
        from: groceryMonkeyemail,
        to: userList,
        subject: monkeyTitle,
        attachment: [{ path: monkeyData.length ? (userPicLoc + monkeyParams.userID + '.jpg') : (path.join(__dirname + '/monkey.gif')), type: 'image/gif', inline:true }]
    });


    server.send(message, function (err, message) {
        err ? console.log('Error sending notifications to ' + userList + ' ' + err.message)
            : console.log('Notifications sent to ' + message.header.to);
    });


}

module.exports = { sendNotifications };