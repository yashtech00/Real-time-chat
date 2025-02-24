import express from "express";
import { Server } from "socket.io";
import {createServer} from "http";


const port = 3000;

const app = express();

const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
});

app.get('/',(req,res)=>{
    res.send("hello")
})

io.on("connection",(socket)=>{
    console.log("user connected",socket.id);
    socket.on("message",(data)=>{
        console.log(data);
        
    })
    io.emit("reveive-message",data);
})


server.listen(port,()=>{
    console.log(`server is listen to port ${port}`);
    
})