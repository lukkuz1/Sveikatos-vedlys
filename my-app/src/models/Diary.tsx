import { getDatabase, ref, get } from "firebase/database";
import { app } from "../services/firebase";

export interface Diary {
  id: string;
  name: string;
  average_sleep_time?: number;
  average_sleep_duration?: number;
  average_calorie_count?: number;
  eat_count?: number;
  activity?: number;
  burned_calories?: number;
  weight_change?: number;
  mood_change?: string;
  records?: Record[];
}

export interface Diet {
  eat_time: number;
  calories: number;
  food_description: string;
}

export interface Sport_activity {
  name: string;
  from: number;
  until: number;
}

export interface Record {
  id: string;
  sleep_time: number;
  bedtime: number;
  mood: number;
  weight: number;
  date: Date;
  diet?: Diet;
  sport_activity?: Sport_activity; 
}

export async function GetDiaryData(): Promise<Diary[]> {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, "diaries");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const diaries: Diary[] = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
        records: mapRecords(data[key].records)
      }));
      return diaries;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function mapRecords(records: any): Record[] {
  if (!records) {
    return [];
  }
  return Object.keys(records).map((key) => ({
    ...records[key],
    date: new Date(records[key].date),
    diet: records[key].diet ? { ...records[key].diet } : undefined,
    sport_activity: records[key].sport_activity ? { ...records[key].sport_activity } : undefined
  }));
}
