const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
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
    return new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        const db = client.db(dbName);
        // Insert a single document
        const testCol = db.collection("viajes");
        let promise = testCol.insertOne(item);
        promise.then(res => resolve(res));
        promise.catch(err => reject(err));
      });
    });
  };

  exports.acceptViaje = (viaje, conductor) => {
    return new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        const db = client.db(dbName);
        const testCol = db.collection("viajes");
        let o_id = new ObjectID(viaje._id);
        let promise = testCol.updateOne(
          { _id: o_id },
          { $set: { estado: "confirmado" } }
        );
        promise.then(res => {
          const col2 = db.collection("viajesAceptados");
          let promise = col2.insertOne({
            usuario: viaje.numero,
            conductor: conductor,
            ubicacion: viaje.direccion,
            estado: "aceptado",
            fecha: "01/12/2019",
            viaje: o_id
          });
          resolve(res);
        });
        promise.catch(err => reject(err));
      });
    });
  };

  exports.llegue = viaje => {
    return new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        const db = client.db(dbName);
        const testCol = db.collection("viajes");
        let o_id = new ObjectID(viaje._id);
        let promise = testCol.updateOne(
          { _id: o_id },
          { $set: { estado: "esperando" } }
        );
        promise.then(res => resolve(res));
        promise.catch(err => reject(err));
      });
    });
  };

  exports.recoger = viaje => {
    return new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        const db = client.db(dbName);
        const testCol = db.collection("viajes");
        let o_id = new ObjectID(viaje._id);
        let promise = testCol.updateOne(
          { _id: o_id },
          { $set: { estado: "en curso" } }
        );
        promise.then(res => resolve(res));
        promise.catch(err => reject(err));
      });
    });
  };

  exports.terminar = viaje => {
    return new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        const db = client.db(dbName);
        const testCol = db.collection("viajes");
        let o_id = new ObjectID(viaje._id);
        let promise = testCol.updateOne(
          { _id: o_id },
          { $set: { estado: "terminado" } }
        );
        promise.then(res => resolve(res));
        promise.catch(err => reject(err));
      });
    });
  };

  // Viajes Aceptados--------------------------------------

  exports.getViajesAceptados = conductor => {
    return new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        const db = client.db(dbName);
        // Insert a single document
        const testCol = db.collection("viajesAceptados");
        return testCol
          .find({ conductor: conductor })
          .toArray()
          .then(resolve);
      });
    });
  };
  // Auth--------------------------------------------------

  exports.createUser = item => {
    return new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        const db = client.db(dbName);
        // Insert a single document
        const testCol = db.collection("usuarios");
        testCol
          .insertOne(item)
          .then(resolve)
          .catch(err => reject(err));
      });
    });
  };
  exports.findUser = user =>
    new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        const db = client.db(dbName);
        const testCol = db.collection("usuarios");
        return testCol.findOne({ usuario: user.usuario }).then(resolve);
      });
    });

  return exports;
};

module.exports = MyMongoLib;
