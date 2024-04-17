import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../services/firebase";

interface Mission {
  missionName: string;
  missionDescription: string;
}

export default function Missions() {
  const [dataArray, setDataArray] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "missions");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const missions: Mission[] = Object.values(data);
        setDataArray(missions);
      } else {
        alert("error");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="all">
      <div className="read">
        <h1>Peržiūra</h1>
        <table>
          <thead>
            <tr>
              <th>Mission Name</th>
              <th>Mission Description</th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map((item, index) => (
              <tr key={index}>
                <td>{item.missionName}</td>
                <td>{item.missionDescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
