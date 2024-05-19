
import { getDatabase, ref, get, set, push, remove } from "firebase/database";
import { app } from "../services/firebase";
import React, { useEffect, useState } from 'react';

export interface Health_mission {
  id: string;
  missionDescription: string;
  missionType: string;
  missionDuration: string;
  missionStatus: string;
}

export enum Mission_type {
  Type2 = "miego",
  Type3 = "mitybos",
}

export enum Mission_duration {
  Duration1 = "diena",
  Duration2 = "savaitė",
}

export const DisplayMissionEdit = async (
  id: any,
  setMission: (mission: Health_mission | null) => void,
  setInputValues: (values: Health_mission) => void
): Promise<void> => {
  useEffect(() => {
    const fetchMission = async () => {
      try {
        const db = getDatabase(app);
        const missionRef = ref(db, `missions/${id}`);
        const snapshot = await get(missionRef);

        if (snapshot.exists()) {
          setMission({ id, ...snapshot.val() });
          setInputValues({ id, ...snapshot.val() });
        } else {
          console.log('Mission not found');
        }
      } catch (error) {
        console.error('Error fetching mission:', error);
      }
    };

    fetchMission();
  }, [id]);
};

export async function GetHealthMissionsData(): Promise<Health_mission[]> {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, "missions");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const missions: Health_mission[] = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      return missions;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function GetHealthMissionData(id: string): Promise<Health_mission | null> {
  try {
    const db = getDatabase(app);
    const missionRef = ref(db, `missions/${id}`);
    const snapshot = await get(missionRef);

    if (snapshot.exists()) {
      return { id, ...snapshot.val() } as Health_mission;
    } else {
      console.log('Mission not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching mission:', error);
    return null;
  }
}

export async function AddHealthMission(missionData: Health_mission): Promise<void> {
  try {
    const db = getDatabase(app);
    const newDoc = push(ref(db, "missions"));
    await set(newDoc, {
      missionDescription: missionData.missionDescription,
      missionType: missionData.missionType,
      missionDuration: missionData.missionDuration,
    });
    alert("Iššūkis sėkmingai pridėtas!");
  } catch (error) {
    console.error("Error adding mission:", error);
    throw error;
  }
}

export async function DeleteHealthMissionData(id: string): Promise<void> {
  try {
    const db = getDatabase(app);
    const missionRef = ref(db, `missions/${id}`);
    await remove(missionRef);
  } catch (error) {
    console.error("Error deleting mission:", error);
    throw error;
  }
}

export async function EditHealthMissionData(
  id: string,
  missionData: Partial<Health_mission>
): Promise<void> {
  try {
    const db = getDatabase(app);
    const missionRef = ref(db, `missions/${id}`);
    await set(missionRef, missionData);
    alert("Iššūkis sėkmingai redaguotas!");
  } catch (error) {
    console.error("Error updating mission:", error);
    throw error;
  }
}
