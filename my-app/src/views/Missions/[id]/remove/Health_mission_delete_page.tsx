import React from "react";
import { getDatabase, ref, remove } from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";
import { app } from "../../../../services/firebase";
import './MissionRemove.css';
import { deleteMission } from "../../../../models/HealthyMission";

const MissionRemove = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const VerifyConfirmation = async () => {
    try{
      
    }
    catch(error){
      alert("Klaida "+ error)
    }
  };

  const DeleteMissionData = async (id: string) => {
    try{
      await deleteMission(id);
      await GetMissionsList();
      await DisplayAllMissionsPage();
    }
    catch(error){
      alert("Klaida "+ error)
    }
  };

  const GetMissionsList = async () => {
    try{
      
    }
    catch(error){
      alert("Klaida "+ error)
    }
  };

  const DisplayAllMissionsPage = async () => {
    try{
      navigate("/missions");
    }
    catch(error){
      alert("Klaida "+ error)
    }
  };




  const SubmitConfirmation = async (id: string) => {
    try {
      await VerifyConfirmation();
      await DeleteMissionData(id);
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