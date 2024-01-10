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




app.post('/createUser',async(req,res)=>{
    try{
        const id=req.body.phone;
        const userJson={
            phone:req.body.phone,
            pass:req.body.pass,
            firstname:req.body.firstName,
            lastname:req.body.lastName
        };
        const response=db.collection("biju").doc(id).set(userJson);
        res.send(response);
    } catch(error)
    {
        res.send(error);
    }
})

app.post('/login', async (req, res) => {
    try {
    const { phone, pass } = req.body;
    

    const userRef = db.collection("user").doc(phone);
    const userDoc = await userRef.get();
  
    if (userDoc.exists) {
        if(userDoc.data().pass==pass)
        {
         console.log("CORRECT PASSWORD");
        }
        else
        {
            console.log("NOT CORRECT PASSWORD");
        }
        res.json({ message: 'User found', user: userDoc.data() });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
  });









const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})