const {MongoClient} = require("mongodb");

//All elements in collection
async function listDocs(client){
    let data = await client.db("sample").collection("name").find({}).toArray();
    console.log(data);
}

//Inserting only one element
async function InsertOne(client,data){
    let result =  await client.db("sample").collection("name").insertOne(data);
    console.log(`Inserted name : ${data.first} ${data.last} with _id: ${result.insertedId}` );
}

//Delete only one element
async function DeleteOne(client,query){
    await client.db("sample").collection("name").deleteOne(query);
}

//Read one element
async function FindOne(client,query){
    let result = await client.db("sample").collection("name").findOne(query);
    if(result) console.log(`Query name: ${result.first} ${result.last}`);
}

//Update one lement
async function UpdateOne(client,query,update){
    let result = await client.db("sample").collection("name").updateOne(query,{$set:update});
    console.log(`Updated with ${result.insertedId}`);
}

export {listDocs, InsertOne, UpdateOne, DeleteOne};