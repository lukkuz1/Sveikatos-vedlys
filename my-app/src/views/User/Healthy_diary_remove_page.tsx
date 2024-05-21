import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, remove } from 'firebase/database';

const RemoveDiaryEntryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const db = getDatabase();

  const handleRemove = () => {
    const diaryRef = ref(db, `diaries/${id}`);
    remove(diaryRef)
      .then(() => navigate('/healthy/diary'))
      .catch(error => console.error('Error removing diary entry:', error));
  };

  return (
    <div>
      <p>Are you sure you want to delete this diary entry?</p>
      <button onClick={handleRemove}>Yes</button>
      <button onClick={() => navigate('/healthy/diary')}>No</button>
    </div>
  );
};

export default RemoveDiaryEntryPage;