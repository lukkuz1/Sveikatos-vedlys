
import { getDatabase, ref, get, set, push, remove } from "firebase/database";
import { app } from "../services/firebase";
import React, { useEffect, useState } from 'react';

export interface MissionInterface {
  id: string;
  missionDescription: string;
  missionType: string;
  missionDuration: string;
}

export enum MissionType {
  Type1 = "sporto",
  Type2 = "miego",
  Type3 = "mitybos",
}

export enum MissionDuration {
  Duration1 = "diena",
  Duration2 = "savaitė",
}

export const DisplayMissionEdit = async (
  id: any,
  setMission: (mission: MissionInterface | null) => void,
  setInputValues: (values: MissionInterface) => void
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

export async function fetchMissions(): Promise<MissionInterface[]> {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, "missions");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const missions: MissionInterface[] = Object.keys(data).map((key) => ({
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

export async function fetchMissionById(id: string): Promise<MissionInterface | null> {
  try {
    const db = getDatabase(app);
    const missionRef = ref(db, `missions/${id}`);
    const snapshot = await get(missionRef);

    if (snapshot.exists()) {
      return { id, ...snapshot.val() } as MissionInterface;
    } else {
      console.log('Mission not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching mission:', error);
    return null;
  }
}

export async function addMission(
  missionDescription: string,
  missionType: string,
  missionDuration: string
): Promise<void> {
  try {
    const db = getDatabase(app);
    const newDoc = push(ref(db, "missions"));
    await set(newDoc, {
      missionDescription,
      missionType,
      missionDuration,
    });
    alert("Iššūkis sėkmingai pridėtas!");
  } catch (error) {
    console.error("Error adding mission:", error);
    throw error;
  }
}

export async function deleteMission(id: string): Promise<void> {
  try {
    const db = getDatabase(app);
    const missionRef = ref(db, `missions/${id}`);
    await remove(missionRef);
    alert("Iššūkis sėkmingai ištrintas!");
  } catch (error) {
    console.error("Error deleting mission:", error);
    throw error;
  }
}

export async function updateMission(
  id: string,
  missionData: Partial<MissionInterface>
): Promise<void> {
  try {
    console.log(missionData.missionDescription);
    const db = getDatabase(app);
    const missionRef = ref(db, `missions/${id}`);
    await set(missionRef, missionData);
    alert("Iššūkis sėkmingai redaguotas!");
  } catch (error) {
    console.error("Error updating mission:", error);
    throw error;
  }
}
