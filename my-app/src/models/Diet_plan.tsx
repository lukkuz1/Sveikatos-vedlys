import { getDatabase, ref, get, set, update } from "firebase/database";
import { app } from "../services/firebase";

export interface FoodItem {
  name: string;
  calories: number;
  servingSizeG: number;
  fatTotalG: number;
  fatSaturatedG: number;
  proteinG: number;
  sodiumMg: number;
  potassiumMg: number;
  cholesterolMg: number;
  carbohydratesTotalG: number;
  fiberG: number;
  sugarG: number;
}

export interface DayPlan {
  day: number;
  meals: FoodItem[];
}

export interface DietPlan {
  id: number;
  type: 'balanced' | 'weight loss' | 'weight gain';
  duration: 'day' | 'week';
  carbsCount: number;
  proteinCount: number;
  avoidLactose: boolean;
  avoidGluten: boolean;
}

const dummyDietPlan: DietPlan = {
  id: 1,
  type: "balanced",
  duration: "week",
  carbsCount: 250,
  proteinCount: 60,
  avoidLactose: false,
  avoidGluten: false,
};

export async function GetDietPlanData(id: number): Promise<DietPlan | undefined> {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, `dietPlans/${id}`);
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return {
        id: id,
        ...data,
      } as DietPlan;
    } else {
      console.log("No data available");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}

export async function AddDummyDietPlan(): Promise<void> {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, `dietPlans/${dummyDietPlan.id}`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      await update(dbRef, dummyDietPlan);
      console.log("Dummy diet plan updated successfully");
    } else {
      await set(dbRef, dummyDietPlan);
      console.log("Dummy diet plan added successfully");
    }
  } catch (error) {
    console.error("Error adding/updating dummy diet plan:", error);
  }
}

export async function AddDietPlanData(criteria: DietPlan): Promise<void> {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, `dietPlans/${criteria.id}`);
    console.log(criteria)
    await update(dbRef, criteria)

  } catch (error) {
    console.error("Error adding/updating diet plan:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

