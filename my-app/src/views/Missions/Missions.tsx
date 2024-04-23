import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HealthMissionController from "../../controllers/Administrator/Health_mission_controller";
import { MissionInterface } from '../../models/HealthyMission';
import './Missions.css'; // Import the CSS file

const Missions: React.FC = () => {
  const [missions, setMissions] = useState<MissionInterface []>([]);
  const healthMissionController = HealthMissionController();

  useEffect(() => {
    const fetchMissions = async () => {
      const missionsData = await healthMissionController.GetHealthMissions();
      setMissions(missionsData);
    };
    fetchMissions();
  }, [healthMissionController]);

  return (
    <div className="all">
      <div className="read">
        <h1>Missions List</h1>
        <table>
          <thead>
            <tr>
              <th>Mission ID</th>
              <th>Description</th>
              <th>Type</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => (
              <tr key={mission.id}>
                <td>{mission.id}</td>
                <td>{mission.missionDescription}</td>
                <td>{mission.missionType}</td>
                <td>{mission.missionDuration}</td>
                <td>
                  <Link to={`/missions/${mission.id}`}>Peržiūrėti</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Missions;
