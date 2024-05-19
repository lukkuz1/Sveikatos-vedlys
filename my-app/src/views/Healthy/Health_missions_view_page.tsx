import React, { useState, useEffect } from "react";
import Healthy_controller from "../../controllers/Healthy/Healthy_controller";
import { Health_mission } from '../../models/Health_mission';
import './Missions.css';

export default function Health_missions_view_page() {
    const [missions, setMissions] = useState<Health_mission[]>([]);
    const [filter, setFilter] = useState<string>('neįvykdyta');

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
        setFilter('įvykdyta');
    };

    const OpenActiveHealthMissions = () => {
        setFilter('vykdoma');
    };

    const ShowUncompletedMissions = () => {
        setFilter('neįvykdyta');
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
