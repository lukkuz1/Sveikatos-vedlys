import React, { useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";
import { app } from "../../../services/firebase";
import HealthMissionController from "../../../controllers/Administrator/Health_mission_controller";
import "./MissionAdd.css";
import { MissionInterface } from "../../../models/HealthyMission";
import { addMission } from "../../../models/HealthyMission";

enum MissionType {
  Type1 = "sporto",
  Type2 = "miego",
  Type3 = "mitybos",
}

enum MissionDuration {
  Duration1 = "diena",
  Duration2 = "savaitė",
}

export default function MissionAdd() {
  const healthMissionController = HealthMissionController();
  const navigate = useNavigate();
  let [inputValue1, setInputValue1] = useState("");
  const [missions, setMissions] = useState<MissionInterface[]>([]);
  let [inputValue2, setInputValue2] = useState<MissionType>(MissionType.Type1);
  let [inputValue3, setInputValue3] = useState<MissionDuration>(MissionDuration.Duration1);

  const GetMissionData = async () => {
    const missionsData = await healthMissionController.GetHealthMissions();
    setMissions(missionsData);
  };

  const VerifyMission = async () => {
    
  };

  const ValidateMission = async () => {
    
  };

  const OpenMissionsList = async () => {
    navigate("/missions");
  };
  
  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue1(e.target.value);
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue2(e.target.value as MissionType);
  };

  const handleInputChange3 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue3(e.target.value as MissionDuration);
  };


  const AddMission = async () => {
    try{
      await VerifyMission();
      await GetMissionData();
      await ValidateMission();
    }
    catch(error){
      alert("Klaida "+ error)
    }
  };

  AddMission();

  const AddMissionData = async () => {
    try{
      await addMission(inputValue1, inputValue2, inputValue3)
      await OpenMissionsList();
    }
    catch(error){
      alert("Klaida "+ error)
    }
  };

  return (
    <div className="all">
      <div className="add">
        <h2>Iššūkio aprašymas</h2>
        <input type="text" value={inputValue1} onChange={handleInputChange1} />
        <h2>Iššūkio tipas</h2>
        <select value={inputValue2} onChange={handleInputChange2}>
          <option value={MissionType.Type1}>sporto</option>
          <option value={MissionType.Type2}>miego</option>
          <option value={MissionType.Type3}>mitybos</option>
        </select>
        <h2>Iššūkio trukmė</h2>
        <select value={inputValue3} onChange={handleInputChange3}>
          <option value={MissionDuration.Duration1}>dieninė</option>
          <option value={MissionDuration.Duration2}>savaitinė</option>
        </select>
        <br />
        <button onClick={AddMissionData}>Pridėti</button>
      </div>
    </div>
  );
}