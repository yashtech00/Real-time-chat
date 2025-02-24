import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000",{
    withCredentials:true,
  }), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [msg,setMsg] =useState([]);
  const [roomName, setRoomName] = useState("");

  
   
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };
  useEffect(() => {
    
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMsg((msg)=>[...msg,data]);
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinroomHandler=(e)=>{
    e.preventDefault();
    socket.emit("join-room",roomName)
    setRoomName("");
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{height:200}}/>
      <Typography variant="h5" component="div" gutterBottom>
        {socketId}
      </Typography>
      <form onSubmit={joinroomHandler}>
        <h5> Join Room </h5>
        <TextField
          label="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <Button type="submit">join</Button>
      </form>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <TextField
          label="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <Button type="submit">send</Button>
      </form>
      <Stack>
        {
          msg.map((m,i)=>(
            <Typography key={i}>
              {m}

            </Typography>
          ))
        }
      </Stack>
    </Container>
  );
};

export default App;
