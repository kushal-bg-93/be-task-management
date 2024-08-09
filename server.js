const http = require('http');
const socketIo = require('socket.io');
const express=require('express')
const app=express();
const cors=require('cors')
const mongoose = require('mongoose')
const helmet=require('helmet')
const routes=require('./routes/index-route')
const path=require('path')

app.use(cors())


// app.use((req, res, next) => {

//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
//     req.io = io;
//     next();
//   });



require('dotenv').config()

app.use(express.static(path.join(__dirname,'public')))
// app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(routes)
// console.log(__dirname)

// const server=http.createServer(app)
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["authorization","Content-Type"],
//     credentials: true
//   }
// });

// io.on('connection', (socket) => {
//     console.log('A user connected');
  
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });

mongoose.set('debug',true)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(`DB task management connected`)

    app.listen(process.env.PORT,()=>{
        console.log(`server is up and running on ${process.env.PORT}`)
    })
}).catch((err)=>console.log('error in mongoose : ',err))


