import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Health_mission_controller from "../../controllers/Admin/Health_mission_controller";
import { AddHealthMission, Health_mission } from '../../models/Health_mission';
import "./MissionAdd.css";

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
  const navigate = useNavigate();
  const [mission, setMission] = useState<Health_mission>({ id: "", missionDescription: "", missionDuration: MissionDuration.Duration1, missionType: MissionType.Type1, missionStatus: "neįvykdyta" });
  const [descriptionEmpty, setDescriptionEmpty] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMission({ ...mission, [name]: value });
    console.log(mission);
  }

  const SubmitHealthMissionData = async () => {
    let status = Health_mission_controller().VerifyHealthMissionData(mission);

    if (status == 1) {
      setDescriptionEmpty(true);
    } else {
      try {
        AddHealthMission(mission)
        navigate("/admin/missions")
      }
      catch (error) {
        alert("Klaida " + error)
      }
    }
  };

  return (
    <div className="all">
      <div className="add">
        {!descriptionEmpty ? <></> : <><p style={{ color: "rgba(255,0,0,1)" }}>Užpildykite visus laukus</p></>}
        <h2>Iššūkio aprašymas</h2>
        <input type="text" name="missionDescription" value={mission.missionDescription} onChange={handleChange} />
        <h2>Iššūkio tipas</h2>
        <select name="missionType" value={mission.missionType} onChange={handleChange}>
          <option value={MissionType.Type1}>sporto</option>
          <option value={MissionType.Type2}>miego</option>
          <option value={MissionType.Type3}>mitybos</option>
        </select>
        <h2>Iššūkio trukmė</h2>
        <select name="missionDuration" value={mission.missionDuration} onChange={handleChange}>
          <option value={MissionDuration.Duration1}>dieninė</option>
          <option value={MissionDuration.Duration2}>savaitinė</option>
        </select>
        <br />
        <button onClick={() => SubmitHealthMissionData()}>Pridėti</button>
      </div>
    </div>
  );
}
