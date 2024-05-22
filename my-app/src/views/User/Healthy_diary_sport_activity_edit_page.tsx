import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, update } from 'firebase/database';

interface SportActivityData {
  name: string;
  from: number;
  until: number;
}

const EditSportActivityPage: React.FC = () => {
  const { id, recordId } = useParams<{ id: string, recordId: string }>();
  const navigate = useNavigate();
  const [sportActivityData, setSportActivityData] = useState<SportActivityData | null>(null);

  useEffect(() => {
    const fetchSportActivity = async () => {
      try {
        const db = getDatabase();
        const sportActivityRef = ref(db, `diaries/${id}/records/${recordId}/sport_activity`);
        const snapshot = await get(sportActivityRef);
        if (snapshot.exists()) {
          setSportActivityData(snapshot.val());
        }
      } catch (error) {
        console.error('Error fetching sport activity:', error);
      }
    };
    fetchSportActivity();
  }, [id, recordId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSportActivityData(prevState => ({
      ...(prevState as SportActivityData), // Type assertion
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (sportActivityData) {
        const db = getDatabase();
        const sportActivityRef = ref(db, `diaries/${id}/records/${recordId}/sport_activity`);
        update(sportActivityRef, sportActivityData)
          .then(() => navigate(`/healthy/diary/view/${id}/record/view/${recordId}`))
          .catch(error => console.error('Error updating sport activity:', error));
      }
    } catch (error) {
      console.error('Error updating sport activity:', error);
    }
  };

  if (!sportActivityData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Sport Activity</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={sportActivityData.name} onChange={handleChange} />
        <input type="number" name="from" value={sportActivityData.from} onChange={handleChange} />
        <input type="number" name="until" value={sportActivityData.until} onChange={handleChange} />
        <button type="submit">Update Sport Activity</button>
      </form>
    </div>
  );
};

export default EditSportActivityPage;