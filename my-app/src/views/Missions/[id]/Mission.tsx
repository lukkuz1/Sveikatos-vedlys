// views/Missions/Mission.tsx

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HealthMissionController from '../../../controllers/Administrator/Health_mission_controller';
import { MissionInterface } from '../../../models/HealthyMission';

const Mission: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mission, setMission] = useState<MissionInterface | null>(null);
  const healthMissionController = HealthMissionController();

  useEffect(() => {
    const fetchMission = async () => {
      // Check if id exists before calling the controller method
      if (id) {
        const missionData = await healthMissionController.GetHealthMission(id);
        setMission(missionData);
      }
    };
    fetchMission();
  }, [id, healthMissionController]);

  if (!mission) {
    return <div>Loading...</div>;
  }

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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{mission.id}</td>
            <td>{mission.missionDescription}</td>
            <td>{mission.missionType}</td>
            <td>{mission.missionDuration}</td>
            <td><Link to={`/missions/${mission.id}/update`} className="mission-button">
                Edit
              </Link></td>
            <td><Link to={`/missions/${mission.id}/remove`} className="mission-button">
                Delete
              </Link></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Mission;
