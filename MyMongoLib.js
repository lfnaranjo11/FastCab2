const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = process.env.MONGO_URL || "mongodb://localhost:27017";

// Database Name
const dbName = "reactive";

const MyMongoLib = function() {
  const retorno = this || {};
  const client = new MongoClient(url);
  // Use connect method  to connect to the Server

  retorno.getDocs = () =>
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
  return retorno;
};

module.exports = MyMongoLib;
