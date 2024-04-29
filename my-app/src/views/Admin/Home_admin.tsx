import React from "react";
import { useNavigate } from "react-router-dom";

const Home_admin: React.FC = () => {
  const navigate = useNavigate();

  const OpenHealthMissionsPage = () => {
    navigate("/admin/missions")
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: 30 }}>
      <button onClick={OpenHealthMissionsPage} >Sveikatingumo iššūkiai</button>
    </div>
  )
}

export default Home_admin;
