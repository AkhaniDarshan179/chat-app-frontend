import React from "react";

const ChatArea = (messages) => {
  const message = messages.messages.message;
  return (
    <div>
      {message}
    </div>
  );
};

export default ChatArea;
