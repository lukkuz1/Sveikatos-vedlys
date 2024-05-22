import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, update } from 'firebase/database';

interface Diary {
  name: string;
  average_sleep_time: number;
  average_sleep_duration: number;
  average_calorie_count: number;
  eat_count: number;
  activity: number;
  burned_calories: number;
  weight_change: number;
  mood_change: string;
}

const EditDiaryEntryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [diaryData, setDiaryData] = useState<Diary | null>(null);
  const navigate = useNavigate();
  const db = getDatabase();

  useEffect(() => {
    const diaryRef = ref(db, `diaries/${id}`);
    get(diaryRef).then(snapshot => {
      if (snapshot.exists()) {
        setDiaryData(snapshot.val() as Diary);
      } else {
        console.log('No data available');
      }
    }).catch(error => console.error('Error fetching diary entry:', error));
  }, [id, db]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDiaryData(prevState => prevState ? ({
      ...prevState,
      [name]: value
    }) : null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!diaryData) return;

    const diaryRef = ref(db, `diaries/${id}`);
    update(diaryRef, diaryData)
      .then(() => navigate(`/healthy/diary/view/${id}`))
      .catch(error => console.error('Error updating diary entry:', error));
  };

  if (!diaryData) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={diaryData.name} onChange={handleChange} />
      <input type="number" name="average_sleep_time" value={diaryData.average_sleep_time} onChange={handleChange} />
      <input type="number" name="average_sleep_duration" value={diaryData.average_sleep_duration} onChange={handleChange} />
      <input type="number" name="average_calorie_count" value={diaryData.average_calorie_count} onChange={handleChange} />
      <input type="number" name="eat_count" value={diaryData.eat_count} onChange={handleChange} />
      <input type="number" name="activity" value={diaryData.activity} onChange={handleChange} />
      <input type="number" name="burned_calories" value={diaryData.burned_calories} onChange={handleChange} />
      <input type="number" name="weight_change" value={diaryData.weight_change} onChange={handleChange} />
      <input type="text" name="mood_change" value={diaryData.mood_change} onChange={handleChange} />
      <button type="submit">Update Diary Entry</button>
    </form>
  );
};

export default EditDiaryEntryPage;
