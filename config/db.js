const { MongoClient, ServerApiVersion } = require('mongodb');
// const connectionString = "mongodb://127.0.0.1:27017";
const connectionString = "mongodb+srv://finoana:Abcd1234@cluster0.smfgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1 
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        console.log(err);
        return callback(err);
      }

      dbConnection = db.db('eschild');
      console.log('Successfully connected to MongoDB.');
      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};