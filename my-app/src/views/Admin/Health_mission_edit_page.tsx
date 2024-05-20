import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDatabase, ref, set, get } from 'firebase/database';
import { app } from '../../services/firebase';
import Mission from './Health_mission_view_page';
import './Health_mission_edit_page.css'; // Import the CSS file
import { Health_mission, EditHealthMissionData } from '../../models/Health_mission';
import Health_mission_controller from '../../controllers/Admin/Health_mission_controller';

enum MissionType {
  Type1 = "sporto",
  Type2 = "miego",
  Type3 = "mitybos",
}

enum MissionDuration {
  Duration1 = "diena",
  Duration2 = "savaitė",
}

export default function Health_mission_edit_page() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const [mission, setMission] = useState<Health_mission>({ id: "", missionDescription: "", missionDuration: MissionDuration.Duration1, missionType: MissionType.Type1 });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [descriptionEmpty, setDescriptionEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (state.missionData != null) {
      const healthMissionTemp: Health_mission = {
        id: state.missionData.id,
        missionDescription: state.missionData.missionDescription,
        missionDuration: state.missionData.missionDuration,
        missionType: state.missionData.missionType
      }
      setMission(healthMissionTemp);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMission({ ...mission, [name]: value });
  };

  const SubmitHealthMissionData = async (id: string, missionData: Health_mission): Promise<void> => {
    let status = Health_mission_controller().VerifyHealthMissionData(missionData);

    if (status == 1) {
      setDescriptionEmpty(true);
    } else {
      try {
        await EditHealthMissionData(id, missionData)
        navigate("/admin/missions");
      } catch (error) {
        alert("Klaida: " + error);
      }
    }
  };
  if (!mission && !id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="form">
        <h1>Redaguoti</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div>
          {!descriptionEmpty ? <></> : <><p style={{ color: "rgba(255,0,0,1)" }}>Užpildykite visus laukus</p></>}
          <label className="label" htmlFor="missionDescription">Aprašymas:</label>
          <input className="input" type="text" id="missionDescription" name="missionDescription" value={mission.missionDescription} onChange={handleChange} />
        </div>
        <div>
          <label className="label" htmlFor="missionType">Tipas:</label>
          <select className="select" id="missionType" name="missionType" value={mission.missionType} onChange={handleChange}>
            {Object.values(MissionType).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="missionDuration">Trukmė:</label>
          <select className="select" id="missionDuration" name="missionDuration" value={mission.missionDuration} onChange={handleChange}>
            {Object.values(MissionDuration).map((duration) => (
              <option key={duration} value={duration}>{duration}</option>
            ))}
          </select>
        </div>
        <button className="button" onClick={() => id && SubmitHealthMissionData(id, mission)}>Redaguoti</button>
      </div>
    </div>
  );
};
