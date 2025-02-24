import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [msg,setMsg] =useState([]);

  
   
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

  return (
    <Container maxWidth="sm">
      <Box sx={{height:500}}/>
      <Typography variant="h5" component="div" gutterBottom>
        {socketId}
      </Typography>
      <form>
        <h5>
          
        </h5>
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
