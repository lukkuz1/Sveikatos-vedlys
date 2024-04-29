import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Health_mission_controller from "../../controllers/Administrator/Health_mission_controller";
import { Health_mission } from '../../models/Health_mission';

export default function Health_mission_view_page() {
  const { id } = useParams<{ id: string }>();
  const [mission, setMission] = useState<Health_mission | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const missionData = await Health_mission_controller().GetHealthMission(id);
        setMission(missionData);
      }
    };
    fetch();
  }, [id]);

  if (!mission) {
    return <div>Loading...</div>;
  }

  const SubmitDeleteConfirmation = (id: string) => {
    Health_mission_controller().DeleteHealthMission(id);
  }

  const OpenHealthMissionDeletePage = (missionId: string) => {
    if (window.confirm("Ar tikrai norite ištrinti šį iššūkį?")) {
      SubmitDeleteConfirmation(missionId);
      alert("Sėkmingai ištrintas iššūkis");
      navigate("/admin/missions")
    }
  };

  const OpenHealthMissionEditPage = (missionId: string) => {
    return <Link to={`/admin/missions/${missionId}/edit`} state={{ missionData: mission }}>Redaguoti</Link>;
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
            <td>
              <a href="" onClick={() => OpenHealthMissionDeletePage(mission.id)}>Delete</a> | {OpenHealthMissionEditPage(mission.id)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
