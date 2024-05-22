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

  const OpenDiaryMainPage = () => {
    navigate("/healthy/diary")
  }

  const OpenSuggestedConsultation = () => {
    navigate("/suggested_consultation")
  }


  return (
    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: 30 }}>
      <button onClick={OpenChatBot} >Healthy robot</button>
      <button onClick={OpenDiaryMainPage} >Diary</button>
      <button onClick={OpenSuggestedConsultation}>Suggested consultations</button>
      <button onClick={OpenHealthMissionsPage} >Health missions</button>
    </div>
  )
}
export default Home_healthy;
