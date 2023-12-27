import React, { useEffect } from "react";
import io from "socket.io-client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./component/chat";
import Login from "./component/login";
import SignUp from "./component/signup";
import Home from "./component/home";

const App = () => {
  useEffect(() => {
    // Connect to the Socket.io server (replace 'http://localhost:5000' with your server URL)
    const socket = io("http://localhost:8000");

    // Log a message when the connection is established
    socket.on("connect", () => {
      console.log("Socket connection established on the frontend!");
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatroom" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;


