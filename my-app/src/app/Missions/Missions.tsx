import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../services/firebase";
import "./Missions.css";

interface Mission {
  id: string;
  missionDescription: string;
  missionType: string;
  missionDuration: string;
}

export default function Missions() {
  const [dataArray, setDataArray] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, "missions");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const missions: Mission[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setDataArray(missions);
        } else {
          console.log("Nėra duomenų");
        }
      } catch (error) {
        console.error("Klaida gaunant duomenis:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="all">
      <div className="read">
        <h1>Iššūkių Sąrašas</h1>
        <table>
          <thead>
            <tr>
              <th>Iššūkio ID</th>
              <th>Aprašymas</th>
              <th>Tipas</th>
              <th>Trukmė</th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map((mission) => (
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
}