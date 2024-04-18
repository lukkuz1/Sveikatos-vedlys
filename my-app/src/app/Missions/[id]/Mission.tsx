import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../../../services/firebase';
import "./Mission.css";

interface Mission {
  id: string;
  missionDescription: string;
  missionType: string;
  missionDuration: string;
}

const Mission: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mission, setMission] = useState<Mission | null>(null);

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const db = getDatabase(app);
        const missionRef = ref(db, `missions/${id}`);
        const snapshot = await get(missionRef);

        if (snapshot.exists()) {
          setMission({ id, ...snapshot.val() });
        } else {
          console.log('Mission not found');
        }
      } catch (error) {
        console.error('Error fetching mission:', error);
      }
    };

    fetchMission();
  }, [id]);

  if (!mission) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mission">
      <table className="mission-table">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{mission.id}</td>
          </tr>
          <tr>
            <th>Aprašymas</th>
            <td>{mission.missionDescription}</td>
          </tr>
          <tr>
            <th>Tipas</th>
            <td>{mission.missionType}</td>
          </tr>
          <tr>
            <th>Trukmė</th>
            <td>{mission.missionDuration}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Link to={`/missions/${id}/update`} className="mission-button">Redaguoti</Link>
            </td>
            <td>
            <Link to={`/missions/${id}/remove`} className="mission-button">Ištrinti</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Mission;