import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CaloriesBurnedResult {
  name: string;
  calories_per_hour: number;
  duration_minutes: number;
  total_calories: number;
}

export const Healthy_diary_views_page: React.FC = () => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState("");
  const [results, setResults] = useState<CaloriesBurnedResult[]>([]);
  const [error, setError] = useState("");

  const OpenDiaryEntryPage = () => {
    navigate("/healthy/diarypage/entry");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActivity(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/calories_burned", { activity });
      setResults(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      setResults([]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <button onClick={OpenDiaryEntryPage}>Dienoraščio peržiūra</button>
        <button>Dienoraščio pridėjimas</button>
      </div>

      <div style={{ marginTop: 30 }}>
        <input
          type="text"
          value={activity}
          onChange={handleInputChange}
          placeholder="Enter an activity"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: 30 }}>
        {results.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Calories per Hour</th>
                <th>Duration (minutes)</th>
                <th>Total Calories</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.name}</td>
                  <td>{result.calories_per_hour}</td>
                  <td>{result.duration_minutes}</td>
                  <td>{result.total_calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Healthy_diary_views_page;
