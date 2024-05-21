import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, update } from 'firebase/database';

interface Record {
  sleep_time: number;
  bedtime: number;
  mood: number;
  weight: number;
  date: string;
}

const EditRecordPage: React.FC = () => {
  const { id, recordId } = useParams<{ id: string, recordId: string }>();
  const [recordData, setRecordData] = useState<Record | null>(null);
  const navigate = useNavigate();
  const db = getDatabase();

  useEffect(() => {
    const recordRef = ref(db, `diaries/${id}/records/${recordId}`);
    get(recordRef).then(snapshot => {
      if (snapshot.exists()) {
        setRecordData(snapshot.val() as Record);
      } else {
        console.log('No data available');
      }
    }).catch(error => console.error('Error fetching record:', error));
  }, [id, recordId, db]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecordData(prevState => prevState ? ({
      ...prevState,
      [name]: value
    }) : null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!recordData) return;

    const recordRef = ref(db, `diaries/${id}/records/${recordId}`);
    update(recordRef, recordData)
      .then(() => navigate(`/healthy/diary/view/${id}`))
      .catch(error => console.error('Error updating record:', error));
  };

  if (!recordData) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="sleep_time" value={recordData.sleep_time} onChange={handleChange} />
      <input type="number" name="bedtime" value={recordData.bedtime} onChange={handleChange} />
      <input type="number" name="mood" value={recordData.mood} onChange={handleChange} />
      <input type="number" name="weight" value={recordData.weight} onChange={handleChange} />
      <input type="text" name="date" value={recordData.date} onChange={handleChange} />
      <button type="submit">Update Record</button>
    </form>
  );
};

export default EditRecordPage;