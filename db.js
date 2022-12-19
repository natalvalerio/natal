const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost")
            .then(conn => global.conn = conn.db("natal"))
            .catch(err => console.log(err))
 
function findAll() {
    return global.conn.collection("natal").find().toArray();
}

function insert(natal) {
    return global.conn.collection("natal").insertOne(natal);
}
 
const ObjectId = require("mongodb").ObjectId;
function findOne(id) {
    return global.conn.collection("natal").findOne(new ObjectId(id));
}
 
function update(id, natal) {
    return global.conn.collection("natal").updateOne({ _id: new ObjectId(id) }, { $set: natal });
}

function deleteOne(id) {
    return global.conn.collection("natal").deleteOne({ _id: new ObjectId(id) });
}
 
module.exports = { findAll, insert, findOne, update, deleteOne }