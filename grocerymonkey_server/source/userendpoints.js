'use strict';

const newUserPhoto = require('./fileendpoints').newUserPicture;
const deleteUserSelfie = require('./fileendpoints').deleteUserSelfie;

const createUser = function (sqlDB, params, callback) {
    const iSQL = 'INSERT INTO users (name, pin, email, sms, notify) VALUES ($name, $pin, $email, $sms, $notify)';
    const sqlParams = {
        $name: params.name,
        $pin: params.pin,
        $email: params.email,
        $sms: params.sms,
        $notify: params.notify,
    };

    sqlDB.run(iSQL, sqlParams, function (error) {
        if (error) {
            console.log(error.message);
            callback(error);
        } else {
            const msg = "Row(s) inserted into user TABLE : 1";
            console.log(msg);
            new newUserPhoto(this.lastID,callback);
        }
    })
}

const authenticateUser = function (sqlDB, params, callback) {
    const iSQL = 'SELECT * from users where pin = $pin';
    const sqlParams = {
        $pin: params.pin
    };
    let returnparams = [];
    let rowcount = 0; 
    sqlDB.each(iSQL, sqlParams, function (error, row) {
        if (error) {
            console.log(error.message);
            callback(error);
        } else {
            returnparams.push({
                user_id: row.user_id,
                name: row.name,
                pin: row.pin,
                email: row.email,
                sms: row.sms,
                notify: row.notify,
            })
            rowcount++;
        }
    }, function() {
            const msg = "User Authenticated";
            console.log(msg);
            if (rowcount) {
                callback(null, returnparams)
            } else {
                const adminSQL = 'SELECT config_id from config where admin_pin = $pin';
                let rowcount_admin = 0;
                sqlDB.each(adminSQL, sqlParams, function (error, row) {
                    returnparams.push({
                        user_id: -1,
                        name: "admin",
                    })
                    rowcount_admin++;
                }, function () {
                        if (rowcount_admin) {
                            callback(null, returnparams);
                        } else {
                            callback(new Error('Invalid PIN'), null);
                        }
                })
            }
        })
    };



const updateUser = function (sqlDB, params, callback) {
    const iSQL = 'UPDATE users set name = $name, pin = $pin, email = $email, sms = $sms, notify = $notify WHERE user_id=$user_id';
    const sqlParams = {
        $name: params.name,
        $pin: params.pin,
        $user_id: params.user_id,
        $email: params.email,
        $sms: params.sms,
        $notify: params.notify,
    };

    sqlDB.run(iSQL, sqlParams, function (error) {
        if (error) {
            console.log(error.message);
            callback(error,null);
        } else {
            const msg = "Row(s) updated in user TABLE : " + this.changes;
            console.log(msg);
            callback(null,params);
        }
    });
}


const deleteUser = function (sqlDB, params, callback) {
    const iSQL_u = 'DELETE FROM users where user_id = $user_id';
    //const iSQL_g = 'DELETE FROM grocerylisttable where user_id = $user_id';
    const iSQL_g = 'UPDATE grocerylisttable set user_id = 0 where user_id = $user_id';
    const sqlParams = {
        $user_id: params.user_id,
    };

    sqlDB.run(iSQL_g, sqlParams, function (error) {
        if (error) {
            console.log(error.message);
            callback(error);
            return;
        } else {
            const msg = "Row(s) updated in grocerylisttable TABLE : " + this.changes;
            deleteUserSelfie(params.user_id);
            console.log(msg);
        }
    });

    sqlDB.run(iSQL_u, sqlParams, function (error) {
        if (error) {
            console.log(error.message);
            callback(error);
        } else {
            const msg = "Row(s) deleted in user TABLE : " + this.changes;
            console.log(msg);
            callback(null);
        }
    });
}

const getUsers = function (sqlDB, callback) {
    const sSQL = "select * from users left join (select user_id as b_user_id, count(item) as banana_count from " +
        "grocerylisttable where status_id = 5 and user_id != requestor_id and strftime('%m', date) = strftime('%m', 'now') group " +
        "by user_id) as bananas on users.user_id = bananas.b_user_id order by bananas.banana_count desc";
    let returnparams = [];
    let rowcount = 0;
    sqlDB.each(sSQL, function (error, row) {

        if (error) {
            console.log(error.message);
            callback(error);
            return;
        } else {
            returnparams.push({
                user_id: row.user_id,
                name: row.name,
                pin: row.pin,
                email: row.email,
                sms: row.sms,
                notify: row.notify,
                banana_count: row.banana_count? row.banana_count : 0,
            });
            rowcount++;
        }
    }, function () {
        const msg = "Row(s) returned from users: " + rowcount;
        console.log(msg);
        callback(null, returnparams);
    })
}

const getBananaWinnerHistory = function (sqlDB, callback) {
    const sSQL = "select month, user_id, username, max(banana_count) as max_bananas from(select strftime('%Y-%m-02', date) as month, user_id, username, count(item) " +
        "as banana_count from grocerylist where status_id = 5 and user_id != requestor_id group by strftime('%Y-%m', date), user_id) as banana_history group by month order by month desc limit 6";
    let returnparams = [];
    let rowcount = 0;
    sqlDB.each(sSQL, function (error, row) {
        if (error) {
            console.log(error.message);
            callback(error);
            return;
        } else {
            returnparams.push({
                banMonth: row.month,
                banUserID: row.user_id,
                banUserName: row.username,
                banCount: row.max_bananas,
            });
            rowcount++;
        }
    }, function () {
        const msg = "Row(s) returned from Monkey Winners: " + rowcount;
        console.log(msg);
        callback(null, returnparams);
    })
}

const getBananaMoochHistory = function (sqlDB, callback) {
    const sSQL = "select banana_history.month, banana_history.requestor_id, users.name, max(banana_history.request_count) as " + 
        "max_requests from (select strftime('%Y-%m-02', date) as month, requestor_id, count(item) as request_count from " + 
        "grocerylist where requestor_id > 0 group by strftime('%Y-%m', date), requestor_id) as banana_history left join " + 
        "(select user_id, name from users) as users on banana_history.requestor_id = users.user_id group by banana_history.month order by banana_history.month desc limit 6";
    let returnparams = [];
    let rowcount = 0;
    sqlDB.each(sSQL, function (error, row) {
        if (error) {
            console.log(error.message);
            callback(error);
            return;
        } else {
            returnparams.push({
                banMonth: row.month,
                banUserID: row.requestor_id,
                banUserName: row.name,
                banCount: row.max_requests,
            });
            rowcount++;
        }
    }, function () {
        const msg = "Row(s) returned from Monkey Mooches: " + rowcount;
        console.log(msg);
        callback(null, returnparams);
    })
}

const getConfigInfo = function (sqlDB, callback) {
    const configSQL = "select * from config";
    let returnParams = [];
    sqlDB.each(configSQL, function (error, row) {
        if (error) {
            console.log(error.message);
            callback(error);
            return;
        } else {
            returnParams.push({
                configID: row.config_id,
                adminPin: row.admin_pin,
                notifications: row.notifications,
                emailUserName: row.email_user_name,
                emailUserPassword: row.email_user_password,
                smtpServer: row.smtp_server,
                portNumber: row.port_number,
                ssl: row.ssl,
                domain: row.domain,
                emailAlias: row.email_alias,
                appURL: row.app_url,
                httpPort: row.http_port,
                httpsPort: row.https_port,
            })
        }
    }, function () {
        const msg = "Config info loaded";
        console.log(msg);
        callback(null, returnParams);
    })
}

const updateConfigInfo = function (sqlDB, params, callback) {
    const iSQL = 'UPDATE config SET admin_pin = $admin_pin, notifications = $notifications, email_user_name = $email_user_name, email_user_password = $email_user_password, ' +
        'smtp_server = $smtp_server, port_number = $port_number, ssl = $ssl, domain = $domain, email_alias = $email_alias, app_url = $app_url, http_port = $http_port, ' +
        'https_port = $https_port WHERE config_id = $config_id';
    const sqlParams = {
        $config_id: params.configID,
        $admin_pin: params.adminPin,
        $notifications: params.notifications,
        $email_user_name: params.emailUserName,
        $email_user_password: params.emailUserPassword,
        $smtp_server: params.smtpServer,
        $port_number: params.portNumber,
        $ssl: params.ssl,
        $domain: params.domain,
        $email_alias: params.emailAlias,
        $app_url: params.appURL,
        $http_port: params.httpPort,
        $https_port: params.httpsPort,
    };

    sqlDB.run(iSQL, sqlParams, function (error) {
        if (error) {
            console.log(error.message);
            callback(error);
        } else {
            const msg = "Row(s) updated in table CONFIG : " + this.changes;
            console.log(msg);
            callback(null);
        }
    });
}


module.exports = {
    createUser,
    authenticateUser,
    updateUser,
    deleteUser,
    getUsers,
    getBananaWinnerHistory,
    getBananaMoochHistory,
    getConfigInfo,
    updateConfigInfo,

};