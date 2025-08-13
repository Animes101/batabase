const express=require('express');
const app=express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/usersDB')
.then(()=>console.log('db conneted'))
.catch((err)=>console.log(err.message))


app.get('/', (req,res)=>{


    res.send('server is running')
})




app.listen(3000,()=>{
    console.log('server is running')
})