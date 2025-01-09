process.env.ROOT = "c:/projects/grocerymonkey/grocerymonkey_server/";

const notify = require('../source/notifications.js').sendNotifications;
const db = require('sqlite3');
const dbLocation = "c:/projects/grocerymonkey/grocerymonkey_server/data/grocerymonkey.db";

sqlDB = new db.Database(dbLocation, db.OPEN_READWRITE | db.OPEN_CREATE);

const mockMData = [
    {
        itemName: "Beer",
        itemCount: 2,
        itemCode: ":beer:",
        itemNotes: "Yey Beer",
        itemStatusVerb: "GOT",
        itemUserID: 1,
        itemUserName: "Buck",
        itemStatusActive: false,
    },
    {
        itemName: "Milk",
        itemCount: 2,
        itemCode: ":glass_of_milk:",
        itemNotes: "Yey Milk",
        itemStatusVerb: "GOT",
        itemUserID: 1,
        itemUserName: "Buck",
        itemStatusActive: false,
    },
    {
        itemName: "Cheese",
        itemCount: 2,
        itemCode: ":cheese_wedge:",
        itemNotes: "Yey Cheese",
        itemStatusVerb: "NEEDS",
        itemUserID: 2,
        itemUserName: "Nicole",
        itemStatusActive: true,
    },
    {
        itemName: "Apples",
        itemCount: 5,
        itemCode: ":apple:",
        itemNotes: "Yey Apples",
        itemStatusVerb: "NEEDS",
        itemUserID: 2,
        itemUserName: "Nicole",
        itemStatusActive: true,
    },
   
]

const mockData = {
    userName: "Buck",
    userID: 1,
    monkeyData: mockMData,
}


const c_SQL = "update users set notify = 0 where user_id > 1"
sqlDB.run(c_SQL, (error) => {
    if (error) {
        console.log("Error testing")
    } else {
        notify(sqlDB, mockData, () => {
            const u_SQL = "update users set notify = 1"
            sqlDB.run(u_SQL, (error) => {
                error ? console.log(error.message) : console.log("Notification Test Complete")
            })
        })
    }
})

sqlDB.close();

