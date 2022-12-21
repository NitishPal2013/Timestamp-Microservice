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
    return result?result:{};
}

//Delete only one element
async function DeleteOne(query){
    await client.db("timestamp_service").collection("details").deleteOne(query);
}

//Read one element
async function FindOne(client,query){
    let result = await client.db("timestamp_service").collection("details").findOne(query);
    return result;
}

//Update one lement
async function UpdateOne(query,update){
    let result = await client.db("timestamp_service").collection("details").updateOne(query,{$set:update});
    console.log(`Updated with ${result.insertedId}`);
}


module.exports = {FindOne,InsertOne,UpdateOne,DeleteOne,listDocs};
