import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, push } from 'firebase/database';

const AddRecordPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recordData, setRecordData] = useState({
    sleep_time: 0,
    bedtime: 0,
    mood: 0,
    weight: 0,
    date: ''
  });

  const navigate = useNavigate();
  const db = getDatabase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecordData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recordsRef = ref(db, `diaries/${id}/records`);
    push(recordsRef, recordData)
      .then(() => navigate(`/healthy/diary/view/${id}`))
      .catch(error => console.error('Error adding record:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="sleep_time" placeholder="Sleep Time" onChange={handleChange} />
      <input type="number" name="bedtime" placeholder="Bedtime" onChange={handleChange} />
      <input type="number" name="mood" placeholder="Mood" onChange={handleChange} />
      <input type="number" name="weight" placeholder="Weight" onChange={handleChange} />
      <input type="text" name="date" placeholder="Date" onChange={handleChange} />
      <button type="submit">Add Record</button>
    </form>
  );
};

export default AddRecordPage;