import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';

const ViewRecordPage: React.FC = () => {
  const { id, recordId } = useParams<{ id: string, recordId: string }>();
  const [recordData, setRecordData] = useState<any>(null);
  const [sportActivity, setSportActivity] = useState<any>(null);
  const [diet, setDiet] = useState<any>(null);
  const db = getDatabase();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const recordRef = ref(db, `diaries/${id}/records/${recordId}`);
        const recordSnapshot = await get(recordRef);
        if (recordSnapshot.exists()) {
          setRecordData(recordSnapshot.val());
        } else {
          console.log('No record data available');
        }
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    };
  
    const fetchSportActivity = async () => {
      try {
        const sportActivityRef = ref(db, `diaries/${id}/records/${recordId}/sport_activity`);
        const sportActivitySnapshot = await get(sportActivityRef);
        if (sportActivitySnapshot.exists()) {
          const sportActivityData = sportActivitySnapshot.val();
          // Extracting the sport activity data from the nested object
          const activityId = Object.keys(sportActivityData)[0]; // Assuming there's only one activity
          const activity = sportActivityData[activityId];
          console.log('Sport Activity Data:', activity);
          setSportActivity(activity);
        } else {
          console.log('No sport activity data available');
        }
      } catch (error) {
        console.error('Error fetching sport activity:', error);
      }
    };
    
    const fetchDiet = async () => {
      try {
        const dietRef = ref(db, `diaries/${id}/records/${recordId}/diet`);
        const dietSnapshot = await get(dietRef);
        if (dietSnapshot.exists()) {
          const dietData = dietSnapshot.val();
          // Extracting the diet data from the nested object
          const dietId = Object.keys(dietData)[0]; // Assuming there's only one diet
          const dietItem = dietData[dietId];
          console.log('Diet Data:', dietItem);
          setDiet(dietItem);
        } else {
          console.log('No diet data available');
        }
      } catch (error) {
        console.error('Error fetching diet:', error);
      }
    };
  
    fetchRecord();
    fetchSportActivity();
    fetchDiet();
  }, [id, recordId, db]);

  const canAddDiet = !diet; // Check if there's no existing diet
  const canAddSportActivity = !sportActivity; // Check if there's no existing sport activity

  if (!recordData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Record Details</h2>
      {recordData ? (
        <>
          <p>Date: {recordData.date}</p>
          <p>Sleep Time: {recordData.sleep_time}</p>
          <p>Bedtime: {recordData.bedtime}</p>
          <p>Mood: {recordData.mood}</p>
          <p>Weight: {recordData.weight}</p>
        </>
      ) : (
        <div>Loading...</div>
      )}
  
      {sportActivity && (
        <div>
          <h3>Sport Activity</h3>
          <p>Name: {sportActivity.name}</p>
          <p>From: {sportActivity.from}</p>
          <p>Until: {sportActivity.until}</p>
        </div>
      )}
  
      {canAddSportActivity && (
        <div>
          <Link to={`/healthy/diary/view/${id}/record/view/${recordId}/sport_activity/add`}>Add Sport Activity</Link>
        </div>
      )}
  
      {canAddDiet && (
        <div>
          <Link to={`/healthy/diary/view/${id}/record/view/${recordId}/diet/add`}>Add Diet</Link>
        </div>
      )}
  
      {diet && (
        <div>
          <h3>Diet</h3>
          <p>Eat Time: {diet.eat_time}</p>
          <p>Calories: {diet.calories}</p>
          <p>Food Description: {diet.food_description}</p>
        </div>
      )}
  
      <div>
        <Link to={`/healthy/diary/view/${id}/record/view/${recordId}/edit`}>Edit Record</Link>
        <Link to={`/healthy/diary/view/${id}/record/view/${recordId}/remove`}>Remove Record</Link>
      </div>
    </div>
  );
};

export default ViewRecordPage;
