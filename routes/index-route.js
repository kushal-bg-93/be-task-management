const express=require("express")
const app=express();

const main="/app/v1"

app.use(main+"/auth",require('./auth/login'))
app.use(main+"/admin",require('./admin/user'))
app.use(main+"/admin",require('./admin/project'))
app.use(main+"/admin",require('./admin/task'))
app.use(main+"/common",require('./common/comment'))
app.use(main+"/common-subtask",require('./common/subtask'))
app.use(main+"/common-tasks",require('./common/task'))
app.use(main+"/common-projects",require('./common/project'))
app.use(main+"/common-user",require('./common/user'))

// app.use(main+"/admin/auth",require('./admin/adminAuth'))
// app.use(main+"/admin/",require("./admin/addRestraunt"))

app.use((req,res)=>{
    res.send("400 Not Found")
})

module.exports=app;
