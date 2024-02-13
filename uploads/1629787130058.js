const express = require('express')
const cors =require('cors');
const fs =require('fs');
const app =express();

const taskRouter =require('./routes/taskRouter')
app.use(express.json());
app.use(express.urlencoded({extended:false}));

let text= `<embed type="text/markdown" src="https://kulsumansari.github.io/Todo-Backend-API-Server/" height="100%" width="100%"/>`;
fs.writeFileSync("./public/index.html", text);

app.use(express.static('public'))
app.use('/tasks',taskRouter)

app.use(cors());
const port = process.env.PORT || 3001 ; 
app.listen( port , ()=>{
    console.log(`server started at port ${port}`);
})
