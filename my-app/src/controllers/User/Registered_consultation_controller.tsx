import {
    GetConsultationsData,
    GetConsultationData,
    Consultation
} from "../../models/Consultation";
import {
    Review
} from "../../models/Review";

export const Registered_consultation_controller = () => {

    const GetConsultations = async (): Promise<Consultation[]> => {
        return await GetConsultationsData();
    };

    const GetConsultation = async (id: string): Promise<Consultation | null> => {
        return await GetConsultationData(id);
    };
    const VerifyReviewData = (review: Review): number => {
        if (!review.reviewDescription) {
          return 1; // Description is empty
        } else if (!review.reviewAssessment) {
          return 2; // Assessment is empty
        }
        return 0; // All fields are valid
      };
    
      return {
        GetConsultations,
        GetConsultation,
        VerifyReviewData,
      };




}


export default Registered_consultation_controller;
