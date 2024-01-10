const express=require('express');

const app=express();


var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

app.use(express.json());


app.use(express.urlencoded({extended:true}));


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const db=admin.firestore();


app.post('/create',async(req,res)=>{
    try{
        const id=req.body.email;
        const userJson={
            email:req.body.email,
            firstname:req.body.firstName,
            lastname:req.body.lastName
        };
        const response=db.collection("user").doc(id).set(userJson);
        res.send(response);
    } catch(error)
    {
        res.send(error);
    }
})








const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})