import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

import "./App.css";

function App() {
  const [userList, setUserList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userName, setUsername] = useState(null);

  const handleSetUsername = () => {
    const name = prompt("Enter Your Name");
    if (name && name.trim()) {
      setUsername(name.trim());
    } else {
      alert("Invalid name! Please try again.");
    }
  };
  useEffect(() => {
    handleSetUsername();
  }, []);

  return (
    <>
      <h4>Current Users</h4>
      <ul>
        {userList &&
          userList?.length > 0 &&
          userList.map((user, idx) => <li key={idx}>{user}</li>)}
      </ul>
      <h4>Messages</h4>
      <ul>
        {messages?.length > 0 &&
          messages.map((msg, idx) => <li key={idx}>{msg}</li>)}
      </ul>

      <form onSubmit={handleMsgSubmit}>//remaining
        <input type="text" name="msg" id="msg" placeholder="Enter your message"/>
        <button type="sublit">Send</button>
      </form>
    </>
  );
}

export default App;
