import React from "react";
import { DietPlan } from "../../models/Diet_plan";
import { GetDietPlanData } from "../../models/Diet_plan";

export const GetDietPlan = async (id: string): Promise<DietPlan[]> => {
    try {
      const diet = await GetDietPlanData(id);
      return diet ? [diet] : [];
    } catch (error) {
      console.error("Error getting diet plan:", error);
      return [];
    }
  };

const Diet_plan_controller = {
    GetDietPlan: GetDietPlan,
}

export default Diet_plan_controller;
