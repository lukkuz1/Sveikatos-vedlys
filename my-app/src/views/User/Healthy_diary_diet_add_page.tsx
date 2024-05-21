import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, push } from 'firebase/database';

const AddDietPage: React.FC = () => {
  const { id, recordId } = useParams<{ id: string, recordId: string }>();
  const navigate = useNavigate();
  const [dietData, setDietData] = useState({
    eat_time: 0,
    calories: 0,
    food_description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDietData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const db = getDatabase();
      const dietRef = ref(db, `diaries/${id}/records/${recordId}/diet`);
      push(dietRef, dietData)
        .then(() => navigate(`/healthy/diary/view/${id}/record/view/${recordId}`))
        .catch(error => console.error('Error adding diet:', error));
    } catch (error) {
      console.error('Error adding diet:', error);
    }
  };

  return (
    <div>
      <h2>Add Diet</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="eat_time" value={dietData.eat_time} onChange={handleChange} placeholder="Eat Time" />
        <input type="number" name="calories" value={dietData.calories} onChange={handleChange} placeholder="Calories" />
        <input type="text" name="food_description" value={dietData.food_description} onChange={handleChange} placeholder="Food Description" />
        <button type="submit">Add Diet</button>
      </form>
    </div>
  );
};

export default AddDietPage;