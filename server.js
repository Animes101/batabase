const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');




// JSON ডেটা পড়তে
app.use(bodyParser.json());

// URL encoded ডেটা পড়তে
app.use(bodyParser.urlencoded({ extended: true }));
//create schema users


const usersSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:Number,
    langue:Array

});

const users=mongoose.model("users",usersSchema)



mongoose.connect('mongodb://localhost:27017/usersDB')
.then(()=>console.log('db conneted'))
.catch((err)=>console.log(err.message))



app.get('/users', async (req, res) => {
    try {
        const product = await users.find({ age: { $ne: 40 } }); // ডাটা পাওয়া যাবে

        if (product.length > 0) {
            res.status(200).send({
                success: true,
                message: "২৫ বছরের নিচের ইউজার",
                data: product,
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'কোনো ডাটা পাওয়া যায়নি',
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
});


app.post('/users', async(req,res)=>{

    
    try{

        const name=req.body.name;
        const age=req.body.age;
        const langue=req.body.langue;

        const newUser=new users({
            name:name,
            age:age,
            langue:langue,
        });

         const userdata=await newUser.save();

         if(userdata){

            res.send('success');
         }else{

            res.send('not success')
         }


    }catch(err){

        res.status(400).send({
            success:false,
            message:'errror '
        })


    }


})




app.listen(3000,()=>{
    console.log('server is running')
})