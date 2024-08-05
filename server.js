const express=require('express')
const app=express();
const mongoose = require('mongoose')
const helmet=require('helmet')

require('dotenv').config()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.set('debug',true)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(`DB task management connected`)

    app.listen(process.env.PORT,()=>{
        console.log(`server is up and running on ${process.env.PORT}`)
    })
}).catch((err)=>console.log('error in mongoose : ',err))

