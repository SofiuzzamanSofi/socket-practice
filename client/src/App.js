import { io } from "socket.io-client"
import { useEffect, useState } from "react"

function App() {

  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [room, setRoom] = useState("");

  const socket = io.connect("http://localhost:5000");
  // console.log(socket);
  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    // const email = e.target.email.value;
    // console.log(name, email);
    if (!room) {
      return alert("Room Id is empty.")
    }
    setMessage(name)
    socket.emit("reactEvent", { name, room })
  };

  const handleRoom = (e) => {
    e.preventDefault();
    const roomInputName = e.target.room.value;;
    console.log(roomInputName);
    socket.emit("joinRoom", room)
  }

  useEffect(() => {
    socket.on("servermessage", (data) => {
      console.log("data useEffect under:", data);
      if (data) {
        setServerMessage(data?.name)
      }
    })
  }, [socket]);



  return (
    <div >
      <div>
        <h1>This is app.js</h1>
      </div>
      <div>
        <p>send: {message}</p>
        <p>received:{serverMessage}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} >
          <label htmlFor="name">Message:</label>
          <input type="text" name="name" required />
          {/* <label htmlFor="email" >Email</label>
          <input type="email" name="email" required /> */}

          <input type="submit" value="send" />
        </form>
      </div>
      <div>
        <form onSubmit={handleRoom} >

          <label htmlFor="name">Room Id: </label>
          <input type="text" name="room" onChange={e => setRoom(e.target.value)} />
          <input type="submit" value="join room" />
        </form>
      </div>
    </div>
  );
}

export default App;
