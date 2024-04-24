import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate} from 'react-router-dom';
import HealthMissionController from '../../../controllers/Administrator/Health_mission_controller';
import { MissionInterface } from '../../../models/HealthyMission';

const Mission: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mission, setMission] = useState<MissionInterface | null>(null);
  const healthMissionController = HealthMissionController();

  const DisplayHealthMission =() =>
  {
    useEffect(() => {
      const fetchMission = async () => {
        if (id) {
          const missionData = await healthMissionController.GetHealthMission(id);
          setMission(missionData);
        }
      };
      fetchMission();
    }, [id, healthMissionController]);
  }
  DisplayHealthMission();

  

  if (!mission) {
    return <div>Loading...</div>;
  }

  const OpenDeletePage = (missionId: string) => {
    return <Link to={`/missions/${missionId}/remove`}>Pašalinti</Link>;
  };

  const OpenEditPage = (missionId: string) => {
    return <Link to={`/missions/${missionId}/update`}>Redaguoti</Link>;
  };

  return (
    <div className="mission">
      <h1>Mission Details</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{mission.id}</td>
            <td>{mission.missionDescription}</td>
            <td>{mission.missionType}</td>
            <td>{mission.missionDuration}</td>
            <td>{OpenDeletePage(mission.id)} | {OpenEditPage(mission.id)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Mission;
