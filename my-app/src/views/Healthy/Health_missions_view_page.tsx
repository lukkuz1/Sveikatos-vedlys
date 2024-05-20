import React, { useState, useEffect } from "react";
import Healthy_controller from "../../controllers/Healthy/Healthy_controller";
import { Health_mission } from '../../models/Health_mission';
import './Missions.css';
import { useNavigate } from 'react-router-dom';
export default function Health_missions_view_page() {
    const [missions, setMissions] = useState<Health_mission[]>([]);
    const [filter, setFilter] = useState<string>('neįvykdyta');
    const navigate = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            try {
                const missionsData = await Healthy_controller().GetHealthMissions();
                setMissions(missionsData);
            } catch (error) {
                console.log(error);
            }
        };

        fetch();
    }, []);

    const filteredMissions = missions.filter(mission => mission.missionStatus === filter);

    const OpenEndedHealthMissions = () => {
        const filter = Healthy_controller().GetEndedMissions();
        setFilter(filter);
    };

    const OpenActiveHealthMissions = () => {
        const filter = Healthy_controller().GetActiveMissions();
        setFilter(filter);
    };

    const ShowUncompletedMissions = () => {
        const filter = Healthy_controller().GetUncompletedMissions();
        setFilter(filter);
    };

    const SubmitUserConfirmation = async (id: string) => {
        try {
            await Healthy_controller().JoinHealthMission(id);
            alert("Sėkmingai prisijungta prie iššūkio");
            navigate("/healthy/missions");
        } catch (error) {
            console.error("Error joining mission:", error);
        }
    };

    const JoinHealthMission = (missionId: string) => {
        if (window.confirm("Ar tikrai norite prisijungti prie šio iššūkio?")) {
            SubmitUserConfirmation(missionId);
        }
    };

    return (
        <div className="all">
            <div className="read">
                <h1>Missions List</h1>
                <div className="filter-buttons">
                    <button onClick={OpenActiveHealthMissions}>Active Missions</button>
                    <button onClick={OpenEndedHealthMissions}>Finished Missions</button>
                    <button onClick={ShowUncompletedMissions}>Uncompleted Missions</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Mission ID</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Duration</th>
                            <th>Status</th>
                            {filter === 'neįvykdyta' && (
                                <th>
                                    Action
                                </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMissions.map((mission) => (
                            <tr key={mission.id}>
                                <td>{mission.id}</td>
                                <td>{mission.missionDescription}</td>
                                <td>{mission.missionType}</td>
                                <td>{mission.missionDuration}</td>
                                <td>{mission.missionStatus}</td>
                                <td>
                                    {filter === 'neįvykdyta' && (
                                        <a href="" onClick={() => JoinHealthMission(mission.id)}>Prisijungti</a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
