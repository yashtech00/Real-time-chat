import { useEffect, useMemo, useState } from "react";
import {io} from "socket.io-client"
import {Button, Container, TextField} from "@mui/material"

const App = ()=>{
  const socket = useMemo(()=>io("http://localhost:3000"),[]);
  const [message,setMessage] = useState("");

const handleSubmit=(e)=>{
  e.preventDefault();
  socket.emit("message",message);
  setMessage("");
}

const socket= io("http://localhost:3000")


  useEffect(()=>{
    socket.on("connect",()=>{
      console.log("connected",socket.id);
    })

    socket.on("receive-message",(data)=>{
      console.log(data);
      
    })
    socket.on("welcome",(s)=>{
      console.log("sss");
      
    })

    return ()=>{
      socket.disconnect();
    }
  },[])

  return <div>
   <Container>
    <form onSubmit={handleSubmit}>
      <TextField value ={message} onChange={(e)=>setMessage(e.target.value)}/>
      <Button type="submit">send</Button>
    </form>
   </Container>
  </div>
}

export default App;