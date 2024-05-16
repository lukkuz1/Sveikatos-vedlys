import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Health_mission_controller from "../../controllers/Admin/Health_mission_controller";
import { Health_mission } from '../../models/Health_mission';
import './Missions.css';

export default function Health_missions_view_page() {
  const [missions, setMissions] = useState<Health_mission[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const missionsData = await Health_mission_controller().GetHealthMissions();
        setMissions(missionsData);
      }
      catch (error) {
        console.log(error)
      }
    };

    fetch();
  }, []);

  const OpenHealthMissionPage = (missionId: string) => {
    return <Link to={`/admin/missions/${missionId}`}>Peržiūrėti</Link>;
  };

  const OpenHealthMissionAddPage = () => {
    return (
      <NavLink to="/admin/missions/add">
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
                <td>{OpenHealthMissionPage(mission.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {OpenHealthMissionAddPage()}
      </div>
    </div>
  );
};
