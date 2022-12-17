const {MongoClient} = require("mongodb");
// Mongodb Atlas URI
const uri = process.env.KEY; 
// Mongodb Client
const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true});

//All elements in collection
async function listDocs(client){
    let data = await client.db("timestamp_service").collection("details").find({}).toArray();
    return data;
}

//Inserting only one element
async function InsertOne(client,data){
    let result =  await client.db("timestamp_service").collection("details").insertOne(data);
    return result;
}

//Delete only one element
async function DeleteOne(query){
    await client.db("timestamp_service").collection("details").deleteOne(query);
}

//Read one element
async function FindOne(query){
    let result = await client.db("timestamp_service").collection("details").findOne(query);
    if(result) console.log(`Query details: ${result.first} ${result.last}`);
}

//Update one lement
async function UpdateOne(query,update){
    let result = await client.db("timestamp_service").collection("details").updateOne(query,{$set:update});
    console.log(`Updated with ${result.insertedId}`);
}


var connection = async function (client){

    try {
        await client.connect(); // for connection
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close(); // for closing the connection
    }
}

module.exports = {connection,FindOne,InsertOne,UpdateOne,DeleteOne,listDocs};
