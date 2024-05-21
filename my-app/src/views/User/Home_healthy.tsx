import React from "react";
import { useNavigate } from "react-router-dom";

const Home_healthy: React.FC = () => {
  const navigate = useNavigate();

  const OpenHealthMissionsPage = () => {
    navigate("/healthy/missions")
  }
  const OpenChatBot = () => {
    navigate("/healthy/chatbot")
  }
  const OpenRegistredConsultationPage = () => {
    navigate("/healthy/registeredConsultations")
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: 30 }}>
      <button onClick={OpenHealthMissionsPage} >Sveikatingumo iššūkiai</button>
      <button onClick={OpenChatBot} >Sveikatingumo robotas</button>
      <button onClick={OpenRegistredConsultationPage} >Konsultacijos į kurias užsiregistruota</button>
    </div>
  )
}
export default Home_healthy;
