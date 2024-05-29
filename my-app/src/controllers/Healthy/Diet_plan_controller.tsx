import React from "react";
import { AddDietPlanData, DietPlan } from "../../models/Diet_plan";
import { GetDietPlanData } from "../../models/Diet_plan";
import { FoodItem, DayPlan } from "../../models/Diet_plan";

export const GetDietPlan = async (id: string): Promise<DietPlan[]> => {
    try {
      const diet = await GetDietPlanData(id);
      return diet ? [diet] : [];
    } catch (error) {
      console.error("Error getting diet plan:", error);
      return [];
    }
  };

  export const VerifyDietPlanCriteria = async (criteria: DietPlan) => {
    try {
        await ValidateDietPlanCriteriaData(criteria);
    } catch (error) {
        console.error("Error", error);
        return;
    }
};
  
  const ValidateDietPlanCriteriaData = async (criteria: DietPlan) => {
    try {
      // Check if tipas, id, and duration are not empty
      if (!criteria.tipas.trim()) {
        throw new Error("Tipas cannot be empty");
      }
      if (!criteria.id.trim()) {
        throw new Error("ID cannot be empty");
      }
      if (!criteria.duration.trim()) {
        throw new Error("Duration cannot be empty");
      }
  
      // Check if carbsCount and proteinCount are greater than 0
      if (criteria.carbsCount <= 0) {
        throw new Error("Carbs count must be greater than 0");
      }
      if (criteria.proteinCount <= 0) {
        throw new Error("Protein count must be greater than 0");
      }
  
      // Initialize dailyPlans array based on duration
      const dailyPlans: DayPlan[] = [];
      const durationDays = criteria.duration === 'day' ? 1 : 7; // Assuming 'day' or 'week' as options
      for (let i = 1; i <= durationDays; i++) {
        dailyPlans.push({
          day: i,
          meals: [] // Initialize meals as empty array
        });
      }
  
      // Update criteria object with dailyPlans
      criteria.dailyPlans = dailyPlans;
  
      // Data validation passed
      console.log("Data validation successful");
      await AddDietPlanData(criteria);
    } catch (error) {
      console.error("Error", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  };

const Diet_plan_controller = {
    GetDietPlan: GetDietPlan,
    VerifyDietPlanCriteria: VerifyDietPlanCriteria,
}

export default Diet_plan_controller;
