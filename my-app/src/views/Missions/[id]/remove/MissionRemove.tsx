import React from "react";
import { getDatabase, ref, remove } from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";
import { app } from "../../../../services/firebase";
import './MissionRemove.css';

const MissionRemove = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const DisplayMissionDelete= async () => {
    // Implementation
  };

  const SubmitConfirmation = async () => {
    // Implementation
  };

  const handleDelete = async () => {
    try {
      const db = getDatabase(app);
      const missionRef = ref(db, `missions/${id}`);
      await remove(missionRef);
      alert("Iššūkis sėkmingai ištrintas!");
      navigate("/missions");
    } catch (error) {
      console.error("Error deleting mission:", error);
    }
  };

  return (
    <div className="remove">
      <div className="remove-1">
        <h2>Iššūkio ištrinimas</h2>
        <button onClick={handleDelete}>Ištrinti</button>
      </div>
    </div>
  );
};

export default MissionRemove;