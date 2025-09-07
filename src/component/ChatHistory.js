import React from "react";

const ChatHistory = ({ chatHistory }) => {
  return (
    <>
      {chatHistory.map((item, idx) => (
        <div
          key={idx}
          className={`chat-message ${item.type}`}
        >
          <img
            className="avatar"
            src={item.avatar}
            alt={item.type === "user" ? "User" : "Bot"}
          />
          <div className="bubble">
            {item.message}
            <span className="timestamp">{item.timestamp}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatHistory;