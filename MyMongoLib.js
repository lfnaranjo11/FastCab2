const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = process.env.PROD_MONGODB || "mongodb://localhost:27017";

// Database Name
const dbName = "reactive";

const MyMongoLib = function() {
  const exports = this || {};
  const client = new MongoClient(url);
  // Use connect method  to connect to the Server

  exports.getDocs = () =>
    new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Insert a single document
        const testCol = db.collection("pedidosReactive");
        return testCol
          .find({})
          .limit(20)
          .toArray()
          .then(resolve);
      });
    });
  exports.listenToChanges = cbk => {
    client.connect(function(err, client) {
      if (err !== null) {
        throw err;
      }
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      console.log("listening to changens on mongo");

      // Insert a single document
      const testCol = db.collection("pedidosReactive");
      console.log("encontro la coleccion");
      const csCursor = testCol.watch();
      csCursor.on("change", data => {
        console.log("changed", data);
        exports.getDocs().then(docs => cbk(JSON.stringify(docs)));
      });
    });
  };

  exports.insertDocument = item => {
    console.log(item);
    return new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        const db = client.db(dbName);
        // Insert a single document
        const testCol = db.collection("pedidosReactive");
        let promise2 = testCol.insertOne(item);
        promise2.then(res => resolve(res));
        promise2.catch(err => reject(err));
      });
    });
  };
  return exports;
};

module.exports = MyMongoLib;
