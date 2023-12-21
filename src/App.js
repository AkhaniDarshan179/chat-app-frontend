import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./component/chat";
import Login from "./component/login";
import SignUp from "./component/signup";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatroom" element={<Chat />} />          
        </Routes>
      </Router>
    </div>
  );
};

export default App;
