import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, remove } from 'firebase/database';

const RemoveRecordPage: React.FC = () => {
  const { id, recordId } = useParams<{ id: string, recordId: string }>();
  const navigate = useNavigate();
  const db = getDatabase();

  const handleRemove = () => {
    const recordRef = ref(db, `diaries/${id}/records/${recordId}`);
    remove(recordRef)
      .then(() => navigate(`/healthy/diary/view/${id}`))
      .catch(error => console.error('Error removing record:', error));
  };

  return (
    <div>
      <p>Are you sure you want to delete this record?</p>
      <button onClick={handleRemove}>Yes</button>
      <button onClick={() => navigate(`/healthy/diary/view/${id}`)}>No</button>
    </div>
  );
};

export default RemoveRecordPage;