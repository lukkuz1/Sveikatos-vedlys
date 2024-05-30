import React from "react";
import { AddDietPlanData, DietPlan } from "../../models/Diet_plan";
import { GetDietPlanData } from "../../models/Diet_plan";
import { FoodItem, DayPlan } from "../../models/Diet_plan";

export const GetDietPlan = async (id: number): Promise<DietPlan | undefined> => {
  try {
    const diet = await GetDietPlanData(id);
    return diet;
  } catch (error) {
    console.error("Error getting diet plan:", error);
    return undefined;
  }
};

export const VerifyDietPlanCriteria = async (criteria: DietPlan) => {
  try {
    await ValidateDietPlanCriteriaData(criteria);
  } catch (error: any) {
    console.error("Error", error);
    return error.message;
  }
};

const ValidateDietPlanCriteriaData = async (criteria: DietPlan) => {
  try {
    // Check if tipas, id, and duration are not empty
    // Check if carbsCount and proteinCount are greater than 0
    if (criteria.carbsCount <= 0) {
      throw new Error("Carbs count must be greater than 0");
    }
    if (criteria.proteinCount <= 0) {
      throw new Error("Protein count must be greater than 0");
    }
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
