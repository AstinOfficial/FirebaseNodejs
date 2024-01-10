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




app.get('/read/all/',async(req,res)=>{
    try{
        const userRef=db.collection("user");
        const response=await userRef.get();
        let responseArr=[]; //response we get in array ee varuna responseil avisham ilatha kure und
        response.forEach(doc=>{
            responseArr.push(doc.data());
        });

        res.send(responseArr);
    }catch(responseArr)
    {
        res.send(error);
    }
})

app.get('/read/:id',async(req,res)=>{
    try{
        const userRef=db.collection("user").doc(req.params.id);
        const response=await userRef.get();
        res.send(response.data());
    }catch(error)
    {
        res.send(error);
    }
})



app.post('/update',async(req,res)=>{
    try{
        const id=req.body.id;
        const newFirstname="Thanku "
        const userRef=db.collection("user").doc(id).update({
            firstName:newFirstname
        });
        res.send(response);
    }catch(error)
    {
        res.send(error);
    }
})


app.delete('/delete/:id',async(req,res)=>{
    try{
        const response=db.collection("user").doc(req.params.id).delete();
        res.send(response);
    }catch(error)
    {
        res.send(error);
    }
})









const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})