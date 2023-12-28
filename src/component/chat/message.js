import React from "react";

const ChatArea = ({ messages }) => {
  console.log("messages", messages);

  return (
    <div>
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
};

export default ChatArea;
