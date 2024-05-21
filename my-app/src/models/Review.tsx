import { getDatabase, ref, get, set, push, remove } from "firebase/database";
import { app } from "../services/firebase";
import React, { useEffect, useState } from 'react';
export interface Review {
    id: string;
    reviewDescription: string;
    reviewDate: string;
    reviewAssessment: string;
}

export async function GetConsultationReviews(id: string): Promise<Review[]> {
    try {
        const db = getDatabase(app);
        const dbRef = ref(db, `reviews/${id}`);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const reviews: Review[] = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            return reviews;
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
export async function AddReview(consultationId: string, review: Review): Promise<void> {
    try {
        const db = getDatabase(app);
        const dbRef = ref(db, `/reviews/${consultationId}`);
        const newReviewRef = push(dbRef);
        await set(newReviewRef, {
            reviewDescription: review.reviewDescription,
            reviewDate: review.reviewDate,
            reviewAssessment: review.reviewAssessment,
        });
        console.log("Review added successfully");
    } catch (error) {
        console.error("Error adding review:", error);
        throw error;
    }
}

