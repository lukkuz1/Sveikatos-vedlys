import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';

const ViewDiaryEntryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [diaryData, setDiaryData] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const db = getDatabase();

  useEffect(() => {
    const diaryRef = ref(db, `diaries/${id}`);
    get(diaryRef).then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setDiaryData(data);
        if (data.records) {
          setRecords(Object.keys(data.records).map(key => ({
            id: key,
            ...data.records[key]
          })));
        }
      } else {
        console.log('No data available');
      }
    }).catch(error => console.error('Error fetching diary entry:', error));
  }, [id, db]);

  if (!diaryData) return <div>Loading...</div>;

  return (
    <div>
      <h2>{diaryData.name}</h2>
      <p>Average Sleep Time: {diaryData.average_sleep_time}</p>
      <p>Average Sleep Duration: {diaryData.average_sleep_duration}</p>
      <p>Average Calorie Count: {diaryData.average_calorie_count}</p>
      <p>Eat Count: {diaryData.eat_count}</p>
      <p>Activity: {diaryData.activity}</p>
      <p>Burned Calories: {diaryData.burned_calories}</p>
      <p>Weight Change: {diaryData.weight_change}</p>
      <p>Mood Change: {diaryData.mood_change}</p>

      <div>
        <Link to={`/healthy/diary/edit/${id}`}>Edit Diary</Link>
        <Link to={`/healthy/diary/remove/${id}`}>Remove Diary</Link>
        <Link to={`/healthy/diary/view/${id}/add-record`}>Add Record</Link>
      </div>

      <h3>Records</h3>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {records.map(record => (
            <li key={record.id}>
              <Link to={`/healthy/diary/view/${id}/record/view/${record.id}`}>
                {record.date}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewDiaryEntryPage;