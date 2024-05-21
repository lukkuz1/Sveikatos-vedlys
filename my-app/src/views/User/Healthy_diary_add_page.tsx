import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, push } from 'firebase/database';

const AddDiaryEntryPage: React.FC = () => {
  const [diaryData, setDiaryData] = useState({
    name: '',
    average_sleep_time: 0,
    average_sleep_duration: 0,
    average_calorie_count: 0,
    eat_count: 0,
    activity: 0,
    burned_calories: 0,
    weight_change: 0,
    mood_change: '',
  });

  const navigate = useNavigate();
  const db = getDatabase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDiaryData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const diaryRef = ref(db, 'diaries');
    push(diaryRef, diaryData)
      .then(() => navigate('/healthy/diary/'))
      .catch(error => console.error('Error adding diary entry:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="number" name="average_sleep_time" placeholder="Average Sleep Time" onChange={handleChange} />
      <input type="number" name="average_sleep_duration" placeholder="Average Sleep Duration" onChange={handleChange} />
      <input type="number" name="average_calorie_count" placeholder="Average Calorie Count" onChange={handleChange} />
      <input type="number" name="eat_count" placeholder="Eat Count" onChange={handleChange} />
      <input type="number" name="activity" placeholder="Activity" onChange={handleChange} />
      <input type="number" name="burned_calories" placeholder="Burned Calories" onChange={handleChange} />
      <input type="number" name="weight_change" placeholder="Weight Change" onChange={handleChange} />
      <input type="text" name="mood_change" placeholder="Mood Change" onChange={handleChange} />
      <button type="submit">Add Diary Entry</button>
    </form>
  );
};

export default AddDiaryEntryPage;