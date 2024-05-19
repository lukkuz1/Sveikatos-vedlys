import React from "react";
import { useNavigate } from "react-router-dom";

const Home_consultant: React.FC = () => {
  const navigate = useNavigate();

  const OpenConsultations = () => {
    navigate("/consultant/consultations")
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: 30 }}>
      <button onClick={OpenConsultations} >Konsultacijos</button>
    </div>
  )
}

export default Home_consultant;
