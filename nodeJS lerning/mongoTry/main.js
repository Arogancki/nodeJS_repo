var http=require("http");
var dataBase = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("Users table created!");
    db.close();
  });
  db.createCollection("boards", function(err, res) {
    if (err) throw err;
    console.log("Boards table created!");
    db.close();
  });
  db.createCollection("tasks", function(err, res) {
    if (err) throw err;
    console.log("Dic_status table created!");
    db.close();
  });
  db.createCollection("statuses", function(err, res) {
    if (err) throw err;
    console.log("Statuses table created!");
    db.close();
  });
  db.createCollection("dictionary_status", function(err, res) {
    if (err) throw err;
    console.log("Dictionary_status table created!");
    db.close();
  });
});