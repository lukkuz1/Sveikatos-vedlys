import React from "react";
import { useNavigate } from "react-router-dom";

const Home_healthy: React.FC = () => {
  const navigate = useNavigate();

  const OpenChatBot = () => {
    navigate("/healthy/chatbot")
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: 30 }}>
      <button onClick={OpenChatBot} >Sveikatingumo robotas</button>
    </div>
  )
}

export default Home_healthy;
