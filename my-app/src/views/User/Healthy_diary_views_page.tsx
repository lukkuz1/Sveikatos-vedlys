import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { getDatabase, ref, get, update } from "firebase/database";
import Healthy_diary_controller, {
  AnalyzeData,
} from "../../controllers/User/Healthy_diary_controller";
import { Diary, Record, Diet, Sport_activity } from "../../models/Diary";
import "./HealthyDiaryViewsPage.css";

interface CaloriesBurnedResult {
  name: string;
  calories_per_hour: number;
  duration_minutes: number;
  total_calories: number;
}

export const Healthy_diary_views_page: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [showAddDiary, setShowAddDiary] = useState(true);
  const [calorieDataFetched, setCalorieDataFetched] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const { FetchDiaryData } = Healthy_diary_controller;
      await FetchDiaryData(setDiaries, setShowAddDiary, setError);
      if (diaries.length > 0 && !calorieDataFetched) {
        await AnalyzeData(diaries[0].id);
        await GetCalorieData(diaries);
        setCalorieDataFetched(true);
      }
    } catch (err) {
      setError("Failed to fetch diaries. Please try again.");
    }
  }, [diaries, calorieDataFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const OpenDiaryAdd = () => {
    navigate("/healthy/diary/add");
  };

  const GetCalorieData = async (diaries: Diary[]) => {
    try {
      const db = getDatabase();
      const updatedDiaries = [];
      for (const diary of diaries) {
        let totalBurnedCalories = 0;
        if (diary.records) {
          for (const record of diary.records) {
            if (record.sport_activity) {
              const activityId: string = Object.keys(record.sport_activity)[0];
              const sportActivity = (record.sport_activity as any)[activityId];
              const response = await axios.post(
                "http://localhost:3001/api/calories_burned",
                {
                  activity: sportActivity.name,
                }
              );

              if (response.data && response.data.length > 0) {
                const result: CaloriesBurnedResult = response.data[0];
                totalBurnedCalories += result.total_calories;
              }
            }
          }
        }
        updatedDiaries.push({ ...diary, burned_calories: totalBurnedCalories });
      }

      const updates = updatedDiaries.map((updatedDiary) => {
        const diaryRef = ref(db, `diaries/${updatedDiary.id}`);
        return update(diaryRef, {
          burned_calories: updatedDiary.burned_calories,
        });
      });
      await Promise.all(updates);
    } catch (err) {
      setError("Failed to update burned calories. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="addDiaryButton">
        {showAddDiary && <button onClick={OpenDiaryAdd}>Create a diary</button>}
      </div>

      {error && <p className="errorMessage">{error}</p>}

      <div className="statisticsList">
        <ul>
          {diaries.map((diary) => {
            return (
              <li key={diary.id} className="statisticsItem">
                <NavLink to={`/healthy/diary/view/${diary.id}`}>
                  {diary.name}
                </NavLink>
                <div>
                  <h1>User statistics</h1>
                  <p className="statisticsTitle">
                    Average Sleep Time:{" "}
                    <span className="statisticsValue">
                      {diary.average_sleep_time} hours
                    </span>
                  </p>
                  <p className="statisticsTitle">
                    Average Sleep Duration:{" "}
                    <span className="statisticsValue">
                      {diary.average_sleep_duration} hours
                    </span>
                  </p>
                  <p className="statisticsTitle">
                    Average Calorie Count:{" "}
                    <span className="statisticsValue">
                      {diary.average_calorie_count}
                    </span>
                  </p>
                  <p className="statisticsTitle">
                    Eat Count:{" "}
                    <span className="statisticsValue">{diary.eat_count}</span>
                  </p>
                  <p className="statisticsTitle">
                    Activity:{" "}
                    <span className="statisticsValue">{diary.activity}</span>
                  </p>
                  <p className="statisticsTitle">
                    Burned calories:{" "}
                    <span className="statisticsValue">
                      {diary.burned_calories}
                    </span>
                  </p>
                  <p className="statisticsTitle">
                    Weight change:{" "}
                    <span className="statisticsValue">
                      {diary.weight_change}
                    </span>
                  </p>
                  <p className="statisticsTitle">
                    Mood change:{" "}
                    <span className="statisticsValue">{diary.mood_change}</span>
                  </p>
                  <p className="statisticsHumor">
                    Note: Stay active and eat healthy for a happier you!
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Healthy_diary_views_page;
