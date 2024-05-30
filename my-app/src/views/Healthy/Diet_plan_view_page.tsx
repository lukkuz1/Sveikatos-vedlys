import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddDummyDietPlan, GetDietPlanData, DietPlan } from "../../models/Diet_plan";
import Diet_plan_controller from "../../controllers/Healthy/Diet_plan_controller";
import { IMeal, MealContext } from "../../hooks/MealContext";

export const Diet_plan_view_page: React.FC = () => {
  const navigate = useNavigate();
  const mealData = useContext(MealContext);
  const [dietPlanStatus, setDietPlanStatus] = useState<boolean>(false);
  const [dietPlanCriteria, setDietPlanCriteria] = useState<DietPlan>();

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        let tempData: any;

        await Diet_plan_controller.GetDietPlan(1).then((data) => {
          if (data != undefined) {
            setDietPlanCriteria(data);
            setDietPlanStatus(true);
            tempData = data;
          } else {
            navigate("/diet_plan/criteria_page");
          }
        });


        if (tempData != undefined) {

          const SendDietPlanRequest = async () => {
            const response = await fetch('http://localhost:3001/api/food/getmeals', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json' // Specify the content type as JSON
              },
              body: JSON.stringify({ criteria: tempData })
            });

            const data = await response.json();
            return data;
          }
          const meals: IMeal[] = await SendDietPlanRequest();
          mealData.setMeals(meals);
          console.log(meals);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDietPlan();
  }, []);

  // useEffect(() => {
  //   AddDummyDietPlan(); // Add dummy diet plan
  // }, []);

  const OpenClosestShopPage = (index: number) => {
    navigate(`/diet_plan/closest_shop_criteria_page/${index}`)
  }

  return (
    <>
      {
        dietPlanStatus ?
          <>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", marginTop: 30 }}>
              <h1 style={{ alignSelf: "center" }}>Current Diet Plan</h1>
              <div style={{ alignSelf: "center" }}>
                <p>Type: {dietPlanCriteria?.type}</p>
                <p>Duration: {dietPlanCriteria?.duration}</p>
                <p>Carbs Count: {dietPlanCriteria?.carbsCount}</p>
                <p>Protein Count: {dietPlanCriteria?.proteinCount}</p>
                <p>Avoid Gluten: {dietPlanCriteria?.avoidGluten.toString()}</p>
                <p>Avoid Lactose: {dietPlanCriteria?.avoidLactose.toString()}</p>
                <p>Carbs Count: {dietPlanCriteria?.carbsCount}</p>
              </div>
              {mealData.meals?.map((meal, index) => (
                <>
                  <h2>Day: {index + 1}</h2>
                  <div>
                    <p>Breakfast: {meal?.breakfast}</p>
                    <p>Lunch: {meal?.lunch}</p>
                    <p>Dinner: {meal?.dinner}</p>
                    <p>Total Calories: {meal?.totalCalories.toFixed(0)}</p>
                    <p>Total Carbs: {meal?.totalCarbs.toFixed(0)}</p>
                    <p>Total Protein: {meal?.totalProtein.toFixed(0)}</p>
                    <p>Required Products: {meal?.products.join(', ')}</p>
                  </div>
                  <button onClick={() => OpenClosestShopPage(index)} >Find closest stores</button>
                </>
              ))}
            </div >
          </>
          :
          <>
          </>
      }
    </>
  );
};

export default Diet_plan_view_page;
