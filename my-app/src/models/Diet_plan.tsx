import { getDatabase, ref, get, set, update } from "firebase/database";
import { app } from "../services/firebase";

interface FoodItem {
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
  
  interface DayPlan {
    day: number;
    meals: FoodItem[];
  }
  
  export interface DietPlan {
    id: string;
    tipas: 'balanced' | 'weight loss' | 'weight gain';
    duration: 'day' | 'week';
    carbsCount: number;
    proteinCount: number;
    avoidLactose: boolean;
    avoidGluten: boolean;
    dailyPlans: DayPlan[];
  }

  const dummyDietPlan: DietPlan = {
    id: "1",
    tipas: "balanced",
    duration: "week",
    carbsCount: 200,
    proteinCount: 150,
    avoidLactose: false,
    avoidGluten: false,
    dailyPlans: [
      {
        day: 1,
        meals: [
          {
            name: "Oatmeal",
            calories: 150,
            servingSizeG: 40,
            fatTotalG: 3,
            fatSaturatedG: 0.5,
            proteinG: 5,
            sodiumMg: 0,
            potassiumMg: 0,
            cholesterolMg: 0,
            carbohydratesTotalG: 27,
            fiberG: 4,
            sugarG: 1,
          },
          {
            name: "Grilled Chicken",
            calories: 200,
            servingSizeG: 100,
            fatTotalG: 5,
            fatSaturatedG: 1,
            proteinG: 30,
            sodiumMg: 70,
            potassiumMg: 300,
            cholesterolMg: 75,
            carbohydratesTotalG: 0,
            fiberG: 0,
            sugarG: 0,
          },
        ],
      },
    ],
  };

  export async function GetDietPlanData(id: string): Promise<DietPlan | undefined> {
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

