import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import HealthMissionController from "../../controllers/Administrator/Health_mission_controller";
import { MissionInterface } from '../../models/HealthyMission';
import './Missions.css';

const Missions: React.FC = () => {
  const healthMissionController = HealthMissionController();
  const [missions, setMissions] = useState<MissionInterface[]>([]);

  const DisplayMissions = () =>{
    useEffect(() => {
      const fetchMissions = async () => {
        const missionsData = await healthMissionController.GetHealthMissions();
        setMissions(missionsData);
      };
      fetchMissions();
    }, [healthMissionController]);
  }

  DisplayMissions();
  

  const ChooseViewMission = (missionId: string) => {
    return <Link to={`/missions/${missionId}`}>Peržiūrėti</Link>;
  };

  const OpenMissionAdd = () => {
    return (
      <NavLink to="/missions/add">
        <button>Pridėti misiją</button>
      </NavLink>
    );
  };

  

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => (
              <tr key={mission.id}>
                <td>{mission.id}</td>
                <td>{mission.missionDescription}</td>
                <td>{mission.missionType}</td>
                <td>{mission.missionDuration}</td>
                <td>{ChooseViewMission(mission.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {OpenMissionAdd()}
      </div>
    </div>
  );
};

export default Missions;
