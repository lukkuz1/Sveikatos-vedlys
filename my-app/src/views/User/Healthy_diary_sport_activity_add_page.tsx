import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, push } from 'firebase/database';

const AddSportActivityPage: React.FC = () => {
  const { id, recordId } = useParams<{ id: string, recordId: string }>();
  const navigate = useNavigate();
  const [sportActivityData, setSportActivityData] = useState({
    name: '',
    from: 0,
    until: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSportActivityData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const db = getDatabase();
      const sportActivityRef = ref(db, `diaries/${id}/records/${recordId}/sport_activity`);
      push(sportActivityRef, sportActivityData)
        .then(() => navigate(`/healthy/diary/view/${id}/record/view/${recordId}`))
        .catch(error => console.error('Error adding sport activity:', error));
    } catch (error) {
      console.error('Error adding sport activity:', error);
    }
  };

  return (
    <div>
      <h2>Add Sport Activity</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={sportActivityData.name} onChange={handleChange} placeholder="Name" />
        <input type="number" name="from" value={sportActivityData.from} onChange={handleChange} placeholder="From" />
        <input type="number" name="until" value={sportActivityData.until} onChange={handleChange} placeholder="Until" />
        <button type="submit">Add Sport Activity</button>
      </form>
    </div>
  );
};

export default AddSportActivityPage;