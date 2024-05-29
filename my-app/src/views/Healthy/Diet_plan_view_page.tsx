import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddDummyDietPlan, GetDietPlanData, DietPlan } from "../../models/Diet_plan";
import Diet_plan_controller from "../../controllers/Healthy/Diet_plan_controller";

export const Diet_plan_view_page: React.FC = () => {
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        const DietPlanDataExists = await Diet_plan_controller.GetDietPlan("1");
        if (!(DietPlanDataExists.length == 0)) {
          setDietPlans(DietPlanDataExists);
        } else {
          navigate("/diet_plan/criteria_page");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDietPlan();
  }, [navigate]);
  
  // useEffect(() => {
  //   AddDummyDietPlan(); // Add dummy diet plan
  // }, []);

  

  return (
    <div>
      <h1>Diet Plans</h1>
      {dietPlans.map((dietPlan, index) => (
        <div key={index}>
          <h2>Diet Plan {index + 1}</h2>
          <p>Avoid Gluten: {dietPlan.avoidGluten.toString()}</p>
          <p>Avoid Lactose: {dietPlan.avoidLactose.toString()}</p>
          <p>Carbs Count: {dietPlan.carbsCount}</p>
          {dietPlan.dailyPlans.map((dailyPlan, dayIndex) => (
            <div key={dayIndex}>
              <h3>Day {dailyPlan.day}</h3>
              {dailyPlan.meals.map((meal, mealIndex) => (
                <div key={mealIndex}>
                  <h4>Meal {mealIndex + 1}</h4>
                  <p>Name: {meal.name}</p>
                  <p>Calories: {meal.calories}</p>
                  <p>Serving Size (g): {meal.servingSizeG}</p>
                  <p>Total Fat (g): {meal.fatTotalG}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Diet_plan_view_page;
