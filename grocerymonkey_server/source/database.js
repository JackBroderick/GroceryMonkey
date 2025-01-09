'use strict';

const db = require('sqlite3');
const fs = require('fs');
var sqlDB;

const dbClient = function (dbLocation) {
    console.log("Database: " + dbLocation);
    if (!fs.existsSync(dbLocation)) {
        sqlDB = new db.Database(dbLocation, db.OPEN_READWRITE | db.OPEN_CREATE);

        sqlDB.serialize(function () {
            const userTable = 'CREATE TABLE users (user_id INTEGER PRIMARY KEY, name TEXT, pin TEXT, email TEXT, sms TEXT, notify BOOLEAN)';
            const glTable = 'CREATE TABLE grocerylisttable (grocery_list_id INTEGER PRIMARY KEY, user_id INTEGER, requestor_id INTEGER'
                + 'date TEXT, item TEXT, count INTEGER, code TEXT, notes TEXT, status_id INTEGER, photo BOOLEAN, photo_location TEXT)';
            const statusTable = 'CREATE TABLE grocerystatus (status_id INTEGER PRIMARY KEY, status TEXT, action_new BOOLEAN, action_sameuser BOOLEAN, '
                + 'action_type INTEGER, status_verb TEXT, status_active BOOLEAN)';
            const groceryList = 'CREATE VIEW grocerylist as select grocerylisttable.*, grocerystatus.status as status, grocerystatus.status_active as is_active, users.name as username, ' +
                'grocerystatus.status_verb as status_verb, grocerystatus.status_active as status_active from grocerylisttable , grocerystatus, users where grocerylisttable.status_id = grocerystatus.status_id and grocerylisttable.user_id = users.user_id';
            const configTable = 'CREATE TABLE config (config_id INTEGER PRIMARY KEY, admin_pin TEXT, notifications INTEGER, email_user_name TEXT, email_user_password TEXT, smtp_server TEXT,' + 
                'port_number INTEGER, ssl INTEGER, domain TEXT, email_alias TEXT, app_url TEXT, http_port TEXT, https_port TEXT)';
            const emojiLookupTable = "CREATE TABLE emojilookuptable (code TEXT, key TEXT)";

            sqlDB.run(userTable, (error) => {
                error ? console.log('users - ' + error.message) : console.log('users table created');
            });

            sqlDB.run(glTable, (error) => {
                error ? console.log('grocerylisttable - ' + error.message) : console.log('grocerylisttable table created');
            });

            sqlDB.run(statusTable, (error) => {
                error ? console.log('grocerystatus - ' + error.message) : console.log('grocerystatus table created');
            });

            sqlDB.run(configTable, (error) => {
                error ? console.log('config - ' + error.message) : console.log('config table created');
            });

            sqlDB.run(emojiLookupTable, (error) => {
                error ? console.log('emojilookuptable - ' + error.message) : console.log('emojilisttable table created');
            });

            sqlDB.run(groceryList, (error) => {
                error ? console.log('grocerylist - ' + error.message) : console.log('grocerylist view created');
            });

            //Set Initial Config
            const initStatus = 'INSERT INTO config (admin_pin, notifications) VALUES ("1111", 0)';
            sqlDB.run(initStatus, (error) => {
                error ? console.log('initial status - ' + error.message) : console.log('initial config info created');
            });

            //Set grocery statuses
            const statusSQL_s = sqlDB.prepare('INSERT INTO grocerystatus (status, action_new, action_sameuser, action_type, status_verb, status_active) VALUES (?,?,?,?,?,?)');
                statusSQL_s.run(['NEED IT',true,true,2, 'NEEDS', true], (error) => {
                    error ? console.log(error.message) : console.log('status NEED IT added');
                });
                statusSQL_s.run(['DELETE',true,false,3, 'DELETED', false ], (error)=> {
                    error ? console.log(error.message) : console.log('status NEW added');
                });
                statusSQL_s.run(['REJECT',false,true,2, 'REJECTED', false], (error) => {
                    error ? console.log(error.message) : console.log('status REJECT added');
                });
                statusSQL_s.run(['OUT',false,true,2, 'CANT FIND', true], (error) => {
                    error ? console.log(error.message) : console.log('status OUT added');
                });
                statusSQL_s.run(['GOT IT',false,true,2,'GOT',false], (error) => {
                    error ? console.log(error.message) : console.log('status GOT IT added');
                });                
            statusSQL_s.finalize();
        })
    } else {
        sqlDB = new db.Database(dbLocation, db.OPEN_READWRITE);
    }
    return sqlDB;
}

module.exports = dbClient;
