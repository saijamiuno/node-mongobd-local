const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/admin';



MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database connected!");

  const collection = db.collection('db2');
  collection.insertOne({ name: 'John', age: 30 }, function(err, result) {
    if (err) throw err;
    console.log("Document inserted!");
    db.close();
  });
});
