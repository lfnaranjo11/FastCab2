const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
let url = "";
if (process.env.PROD_MONGODB) {
  url = process.env.PROD_MONGODB + "&w=majority";
} else {
  url = "mongodb://localhost:27017";
}

// Database Name
const dbName = "taxis";

const MyMongoLib = function() {
  const exports = this || {};
  const client = new MongoClient(url);
  // Use connect method  to connect to the Server

  exports.getDocs = () =>
    new Promise((resolve, reject) => {
      console.log("se va a conectar al cliente");
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }

        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Insert a single document
        const testCol = db.collection("viajes");
        return testCol
          .find({ estado: "en espera" })
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
      const testCol = db.collection("viajes");
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
        const testCol = db.collection("viajes");
        let promise2 = testCol.insertOne(item);
        promise2.then(res => resolve(res));
        promise2.catch(err => reject(err));
      });
    });
  };

  exports.acceptViaje = viaje => {
    return new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        const db = client.db(dbName);
        const testCol = db.collection("viajes");
        let o_id = new ObjectID(viaje._id);
        testCol.updateOne(
          { _id: o_id },
          { $set: { estado: "en curso" } },
          (err, res) => {
            if (err) {
              reject(res);
            }
            resolve(res);
          }
        );
      });
    });
  };

  return exports;
};

module.exports = MyMongoLib;
