import React from "react";
import { getDatabase, ref, remove } from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";
import { app } from "../../../../services/firebase";
import './MissionRemove.css';
import { deleteMission } from "../../../../models/HealthyMission";

const MissionRemove = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();



  const SubmitConfirmation = async (id: string) => {
    try {
      await deleteMission(id);
      navigate("/missions");
    } catch (error) {
      console.error("Error deleting mission:", error);
    }
  };

  return (
    <div className="remove">
      <div className="remove-1">
        <h2>Iššūkio ištrinimas</h2>
        <button onClick={() => id && SubmitConfirmation(id)}>Ištrinti</button>
      </div>
    </div>
  );
};


export default MissionRemove;