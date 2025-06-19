import { useState } from "react";
import axios from "axios";
import "./ChatBot.css"; // Importing the manual CSS

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const examplePrompts = [
    "Recommend me a restaurant",
    "I wish to have some pizza",
    "Suggest a place for Indian food"
  ];

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);
    setMessage("");

    try {
      const res = await axios.post("http://127.0.0.1:5000/chatbot", { message });
      setChat([...newChat, { sender: "bot", text: res.data.response }]);
    } catch (error) {
      setChat([...newChat, { sender: "bot", text: "Error fetching response" }]);
    }
  };

  return (
    <div className="chat-container">
      <h2>Restaurant ChatBot</h2>
      
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div className="prompt-container">
        <h4>Try these prompts:</h4>
        {examplePrompts.map((prompt, index) => (
          <button key={index} onClick={() => setMessage(prompt)}>
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatBot;
