import { getDatabase, ref, get, set, push, remove } from "firebase/database";
import { app } from "../services/firebase";
import React, { useEffect, useState } from 'react';
import {Time} from "./Time";
export interface Consultation {
    id: string;
    consultationDescription: string;
    consultationLink: string;
    consultationType: string;
    consultationTime: string;
    status: string;
}

export enum Healthy_lifestyle_category {
    Type1 = "sporto",
    Type2 = "miego",
    Type3 = "mitybos",
}

export async function GetConsultationsData(): Promise<Consultation[]> {
    try {
        const db = getDatabase(app);
        const dbRef = ref(db, "consultations");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const consultations: Consultation[] = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            return consultations;
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function GetConsultationData(id: string): Promise<Consultation | null> {
    try {
      const db = getDatabase(app);
      const consultationRef = ref(db, `consultations/${id}`);
      const snapshot = await get(consultationRef);
  
      if (snapshot.exists()) {
        return { id, ...snapshot.val() } as Consultation;
      } else {
        console.log('Consultation not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching consultation:', error);
      return null;
    }
  }

export async function GetRegisteredConsultations(): Promise<Consultation[]> {
    try {
        const db = getDatabase(app);
        const dbRef = ref(db, "consultations");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const consultations: Consultation[] = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            return consultations.filter(consultation => consultation.status === "registruota");
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}