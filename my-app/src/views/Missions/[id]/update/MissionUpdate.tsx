import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, get } from 'firebase/database';
import { app } from '../../../../services/firebase';
import Mission from '../Health_mission_view_page';
import './MissionUpdate.css'; // Import the CSS file
import { MissionInterface } from '../../../../models/HealthyMission';
import { updateMission } from '../../../../models/HealthyMission';
import { DisplayMissionEdit } from '../../../../models/HealthyMission';

enum MissionType {
  Type1 = "sporto",
  Type2 = "miego",
  Type3 = "mitybos",
}

enum MissionDuration {
  Duration1 = "diena",
  Duration2 = "savaitė",
}

const MissionUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [mission, setMission] = useState<MissionInterface | null>(null);
  const [inputValues, setInputValues] = useState<MissionInterface>({ id: '', missionDescription: '', missionType: '', missionDuration: '' });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  DisplayMissionEdit(id, setMission, setInputValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const SubmitMissionEdit = async (id: string, inputValues: Partial<MissionInterface>
  ): Promise<void> => {
    try {
      await updateMission(id, inputValues)
      navigate("/missions");
    } catch (error) {
      alert("Klaida: " + error);
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
          <label className="label" htmlFor="missionDescription">Aprašymas:</label>
          <input className="input" type="text" id="missionDescription" name="missionDescription" value={inputValues.missionDescription} onChange={handleChange} />
        </div>
        <div>
          <label className="label" htmlFor="missionType">Tipas:</label>
          <select className="select" id="missionType" name="missionType" value={inputValues.missionType} onChange={handleChange}>
            {Object.values(MissionType).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="missionDuration">Trukmė:</label>
          <select className="select" id="missionDuration" name="missionDuration" value={inputValues.missionDuration} onChange={handleChange}>
            {Object.values(MissionDuration).map((duration) => (
              <option key={duration} value={duration}>{duration}</option>
            ))}
          </select>
        </div>
        <button className="button" onClick={() => id && SubmitMissionEdit(id, inputValues)}>Redaguoti</button>
      </div>
    </div>
  );
};

export default MissionUpdate;