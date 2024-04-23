import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, set, get } from 'firebase/database';
import { app } from '../../../../services/firebase';
import Mission from '../Mission';
import './MissionUpdate.css'; // Import the CSS file
import { MissionInterface } from '../../../../models/HealthyMission';

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
  const { id } = useParams<{ id: string }>();
  const [mission, setMission] = useState<MissionInterface | null>(null);
  const [inputValues, setInputValues] = useState<MissionInterface>({ id: '', missionDescription: '', missionType: '', missionDuration: '' });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const DisplayMissionEdit= async () => {
    // Implementation
  };

  const SubmitMissionEdit = async () => {
    // Implementation
  };

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const db = getDatabase(app);
        const missionRef = ref(db, `missions/${id}`);
        const snapshot = await get(missionRef);

        if (snapshot.exists()) {
          setMission({ id, ...snapshot.val() });
          setInputValues({ id, ...snapshot.val() });
        } else {
          console.log('Mission not found');
        }
      } catch (error) {
        console.error('Error fetching mission:', error);
      }
    };

    fetchMission();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const db = getDatabase(app);
      const missionRef = ref(db, `missions/${id}`);
      await set(missionRef, inputValues);
      setSuccessMessage('Sėkmingai redaguotas iššūkis!');
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    } catch (error) {
      console.error('Error updating mission:', error);
    }
  };

  if (!mission) {
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
        <button className="button" onClick={handleUpdate}>Redaguoti</button>
      </div>
    </div>
  );
};

export default MissionUpdate;