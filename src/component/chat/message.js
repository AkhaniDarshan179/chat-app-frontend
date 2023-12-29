// message.js
import React from "react";
import "./message.css";

const ChatArea = ({ messages, currentUser }) => {
  return (
    <div className="chat-area">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${
            msg.sender === currentUser ? "sent" : "received"
          }`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatArea;
