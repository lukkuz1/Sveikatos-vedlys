import React from "react";
import { GetConsultationsData, GetConsultationData } from "../../models/Consultation";
import { Consultation } from "../../models/Consultation";
import { registerConsultationModel, HealthyConsultation } from "../../models/Healthy_consultation";
import { Review, GetConsultationReviews } from "../../models/Review";
import { Diary, GetDiaryData as GetUserDiaryData } from "../../models/Diary";

export const GetUserConsultations = async (): Promise<Consultation[]> => {
  try {
    const consultations = await GetConsultationsData();
    return consultations;
  } catch (error) {
    console.error("Error getting user consultations:", error);
    return [];
  }
};

export const GetConsultation = async (id: string): Promise<Consultation | null> => {
  try {
    const consultation = await GetConsultationData(id);
    return consultation;
  } catch (error) {
    console.error("Error getting consultation:", error);
    return null;
  }
};

export async function registerConsultation(data: HealthyConsultation): Promise<void> {
  try {
    await registerConsultationModel(data);
    console.log("Consultation registered successfully");
  } catch (error) {
    console.error("Error registering consultation:", error);
    throw error;
  }
}

export async function GetUserReviews(): Promise<Review[]> {
  const id = "belekas";
  try {
    const reviews = await GetConsultationReviews(id);
    return reviews;
  } catch (error) {
    console.error("Error getting user reviews:", error);
    return [];
  }
}

export async function GetDiaryData(): Promise<Diary[]> {
  try {
    const diaryData = await GetUserDiaryData();
    return diaryData;
  } catch (error) {
    console.error("Error getting diary data:", error);
    return [];
  }
}

export const GetConsultationReviewsForUser = async (userId: string): Promise<Review[]> => {
  try {
    const reviews = await GetConsultationReviews(userId);
    return reviews;
  } catch (error) {
    console.error("Error getting consultation reviews for user:", error);
    return [];
  }
};



const Suggested_consultation_controller = {
  GetUserConsultations: GetUserConsultations,
  GetConsultation: GetConsultation,
  GetDiaryData: GetDiaryData,
  GetUserReviews: GetUserReviews,
  GetConsultationReviewsForUser: GetConsultationReviewsForUser,
};

export default Suggested_consultation_controller;
