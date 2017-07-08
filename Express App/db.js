var dataBase = require('mongodb').MongoClient;   // MongoDB databases
var dataBaseUrl = "mongodb://localhost:27017/TaskMenagerApp"; //dataBase address

var usersTable = "users";

// remember to run run database in background
// "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
module.exports = {
    sum: function () {
        return true;
    },
    multiply: function () {
        return true;
    }
};

function Connect(){
    dataBase.connect(dataBaseUrl, function(err, db) {
        if (err) throw err;
        return db;
    });
}

function GetUser(login, password) {
    var db = Connect();
    var user;
    db.collection(usersTable).findOne({ login: login, password: password }, function (err, result) {
        if (err) throw err;
        user = result;
    });
    db.close();
    return user;
}

function InsertUser(login, password, email) {
    if (GetUser(login, password) !== undefined)
        return false;
    var db = Connect();
    db.collection(usersTable).insertOne({ login:login, password: password, email: email }, function (err, res) {
        if (err) throw err;
        console.log("New user created");
    });
    db.close();
    return true;
}

var czy = InsertUser("login1", 'password3', 'email2');
if (czy) {
    var user = GetUser("login1", 'password3');
    console.log(user.login);
    console.log(user.password);
    console.log(user.email);
}