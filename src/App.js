import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Chat from "./component/chat";
import Home from "./component/home";
import Login from "./component/login";
import React from "react";
import SignUp from "./component/signup";

const App = () => {
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

