import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";
import ChatHistory from "./component/ChatHistory";
import Loading from "./component/Loading";

// Avatar images (replace with your own or use URLs)
const USER_AVATAR =
  "https://randomuser.me/api/portraits/men/32.jpg";
const BOT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/4712/4712035.png";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBFBYO_RzAdgFYUsho6LLM-MJx-VhnaMW4"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e) => setUserInput(e.target.value);

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    try {
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput, avatar: USER_AVATAR, timestamp }
      ]);
      const result = await model.generateContent(userInput);
      const response = await result.response;
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          message: response.text(),
          avatar: BOT_AVATAR,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => setChatHistory([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) sendMessage();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-gray-100 p-4">
      {/* Title */}
      <h1 className="page-title">🚀 Sparks AI Chatbot</h1>

      {/* Chat Container */}
      <div className="chat-container">
        <div className="chat-header">
          <span>Sparks AI</span>
          <span className="status">Online</span>
        </div>
        <div className="chat-box">
          <ChatHistory chatHistory={chatHistory} />
          <Loading isLoading={isLoading} />
        </div>
        {/* Input Area */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={handleUserInput}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
            aria-label="Send"
            style={{
              background: "linear-gradient(90deg, #2563eb 80%, #60a5fa 100%)",
              border: "none",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              boxShadow: "0 2px 8px #c7d2fe",
              transition: "background 0.2s, transform 0.1s",
            }}
          >
            <svg className="send-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="12" fill="#2563eb" opacity="0.1"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" stroke="#fff"/>
            </svg>
          </button>
        </div>
      </div>
      {/* Clear Button */}
      {/* 
      <button
        className="mt-4 px-5 py-2 rounded-xl bg-gray-500 text-white hover:bg-gray-600 transition"
        onClick={clearChat}
      >
        Clear Chat
      </button>
      */}
    </div>
  );
};

export default App;
