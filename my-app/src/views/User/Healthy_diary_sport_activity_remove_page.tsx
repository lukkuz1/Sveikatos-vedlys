import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, remove } from 'firebase/database';

const RemoveSportActivityPage: React.FC = () => {
  const { id, recordId } = useParams<{ id: string, recordId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleRemove = async () => {
    try {
      setLoading(true);
      const db = getDatabase();
      const sportActivityRef = ref(db, `diaries/${id}/records/${recordId}/sport_activity`);
      await remove(sportActivityRef);
      navigate(`/healthy/diary/view/${id}/record/view/${recordId}`);
    } catch (error) {
      console.error('Error removing sport activity:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Remove Sport Activity</h2>
      <p>Are you sure you want to remove this sport activity?</p>
      <button onClick={handleRemove} disabled={loading}>Remove Sport Activity</button>
    </div>
  );
};

export default RemoveSportActivityPage;