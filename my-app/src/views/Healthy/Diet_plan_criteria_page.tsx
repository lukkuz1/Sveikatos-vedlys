import { json } from "body-parser";
import { on } from "events";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Diet_plan_controller from "../../controllers/Healthy/Diet_plan_controller";
import { MealContext } from "../../hooks/MealContext";
import { DietPlan } from "../../models/Diet_plan";

type Meal = {
  breakfast: string;
  lunch: string;
  dinner: string;
  products: string[];
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
}

export const Diet_plan_criteria_page: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const [criteria, setCriteria] = useState<DietPlan>({
    id: 1,
    type: "balanced",
    duration: "day",
    carbsCount: 0,
    proteinCount: 0,
    avoidLactose: false,
    avoidGluten: false,
  });

  const mealData = useContext(MealContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const inputValue = type === "checkbox" ? (event.target as HTMLInputElement).checked : value;
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: inputValue,
    }));
  };

  const DietPlanGeneration = async () => {
    try {
      const status = await Diet_plan_controller.VerifyDietPlanCriteria(criteria)
      if (status != undefined) {
        setError(status);
      } else {
        setError("");
        const SendDietPlanRequest = async () => {
          const response = await fetch('http://localhost:3001/api/food/getmeals', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json' // Specify the content type as JSON
            },
            body: JSON.stringify({ criteria: criteria })
          });

          const data = await response.json();
          return data;
        }

        const meals: Meal[] = await SendDietPlanRequest();
        mealData.setMeals(meals);

        alert("Diet plan generated!");
        console.log(meals);
        navigate("/diet_plan");
      }


    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 30 }}>
      <h1 style={{ alignSelf: "center", color: 'red' }}>{error}</h1>
      <h1>Enter Diet Plan Criteria</h1>
      <label>
        Type:
        <select name="type" value={criteria.type} onChange={handleInputChange}>
          <option value="balanced">Balanced</option>
          <option value="weight loss">Weight Loss</option>
          <option value="weight gain">Weight Gain</option>
        </select>
      </label>
      <label>
        Duration:
        <select name="duration" value={criteria.duration} onChange={handleInputChange}>
          <option value="day">Day</option>
          <option value="week">Week</option>
        </select>
      </label>
      <label>
        Carbs Count:
        <input type="number" name="carbsCount" value={criteria.carbsCount} onChange={handleInputChange} />
      </label>
      <label>
        Protein Count:
        <input type="number" name="proteinCount" value={criteria.proteinCount} onChange={handleInputChange} />
      </label>
      <label>
        Avoid Lactose:
        <input type="checkbox" name="avoidLactose" checked={criteria.avoidLactose} onChange={handleInputChange} />
      </label>
      <label>
        Avoid Gluten:
        <input type="checkbox" name="avoidGluten" checked={criteria.avoidGluten} onChange={handleInputChange} />
      </label>
      <button onClick={DietPlanGeneration}>Generate Diet Plan</button>
    </div>
  );
};

export default Diet_plan_criteria_page;
