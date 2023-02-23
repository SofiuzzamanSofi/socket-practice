import { io } from "socket.io-client"
import { useEffect, useState } from "react"

function App() {

  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  const socket = io.connect("http://localhost:5000");
  console.log(socket);
  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    setMessage(name)
    socket.emit("reactEvent", { name, email })
  }

  useEffect(() => {
    socket.on("servermessage", (data) => {
      console.log("data useEffect under:", data);
      if (data) {
        setServerMessage(data?.name)
      }
    })
  }, [message, serverMessage, socket])

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
        <form onSubmit={e => handleSubmit(e)} >
          <label htmlFor="name">Name</label>
          <input type="text" name="name" required />
          <label htmlFor="email" >Email</label>
          <input type="email" name="email" required />

          <input type="submit" value="send" />
        </form>
      </div>
    </div>
  );
}

export default App;
