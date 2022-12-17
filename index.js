const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const body_parser = require('body-parser');
const {MongoClient} = require('mongodb');
const uri = process.env.KEY; 
const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true});
const {connection,FindOne,InsertOne,UpdateOne,DeleteOne,listDocs} = require('./db.js');


app.use(cors());
app.use(body_parser.urlencoded({extended:false}));


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/frontend/home.html')
})

app.get('/add',(req,res)=>{
    res.sendFile(__dirname+'/frontend/add.html')
})

app.get('/data',(req,res)=>{
    let obj;
    async function liDocs(res){
        try {
            await client.connect();
            obj = await listDocs(client);
            res.json(obj);
        } catch (err) {
            console.error(err);
        }
        finally{
            client.close();
        }
    }
    liDocs(res).catch(e=>console.error(e));
})

app.post('/name',(req,res)=>{
    let str = req.body;
    async function inDocs(str){
        try {
            await client.connect();
            await InsertOne(client,{name:str.name,url:str.url});
        } catch (err) {
            console.error(err);
        }
        finally{
            client.close();
        }
    }
    inDocs(str).catch(e=>console.error(e));
    res.sendFile(__dirname+'/frontend/add.html');
})

app.listen(port,()=>{
    console.log(`server is live at http://localhost:${port}`);
})
