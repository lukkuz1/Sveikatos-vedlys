import React, { useState } from "react";
import "./Chatbot_page.css";
const ChatbotPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Labas, aš esu Sveikatingumo robotas, kuo galiu šiandien jums padėti?",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const SubmitMessage = async () => {
    if (isLoading || userInput.trim() === "") {
      return;
    }
    setIsLoading(true);
    try {
      const temp = [...messages, { role: "user", content: userInput }];
      setMessages(temp);

      console.log("Calling OpenAI...");

      const response = await fetch("http://localhost:3001/api/chat_gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: temp }),
      });

      const data = await response.json();
      const message = data.response;

      console.log("OpenAI replied...", message);

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: message },
      ]);

      setUserInput("");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="chatbot-page">
      <h1 className="title">Sveikatingumo robotas</h1>
      <div className="chat-container">
        <div className="message-container">
          {messages.map((e, index) => (
            <div
              key={index}
              className={`message ${
                e.role === "assistant" ? "assistant" : "user"
              }`}
            >
              {e.content}
            </div>
          ))}
          {isLoading && <div className="message assistant">*Galvoja*</div>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="input-field"
            placeholder="Įveskite savo žinutę"
          />
          <button
            onClick={SubmitMessage}
            className={`send-button ${isLoading ? "disabled" : ""}`}
            disabled={isLoading}
          >
            Siųsti
          </button>
        </div>
      </div>
    </main>
  );
};

export default ChatbotPage;
