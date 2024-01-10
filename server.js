const express=require('express');

const app=express();


var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const db=admin.firestore();

app.use(express.json());


app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})