import { getDatabase, ref, push, query, orderByChild, equalTo, get } from "firebase/database";
import { app } from "../services/firebase";

export interface HealthyConsultation {
  userName: string;
  consultationId: string;
  consultationDescription: string;
}

export async function registerConsultationModel(data: HealthyConsultation): Promise<void> {
  try {
    const db = getDatabase(app);
    const consultationsRef = ref(db, "healthy_consultation");
    const existingConsultationQuery = query(consultationsRef, orderByChild("consultationId"), equalTo(data.consultationId));
    const existingConsultationSnapshot = await get(existingConsultationQuery);
    console.log("existingConsultationSnapshot:", existingConsultationSnapshot);
    if (existingConsultationSnapshot.exists()) {
      throw new Error("User already registered for this consultation");
    } else {
      await push(consultationsRef, data);
    }
  } catch (error: any) {
    console.error("Error registering consultation:", error);
    throw new Error("Error registering consultation: " + error.message);
  }
}
