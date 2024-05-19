import {
    GetConsultationsData,
    GetConsultationData,
    // AddConsultationData,
    // DeleteConsultationData,
    // EditConsultation,
    Consultation
} from "../../models/Consultation";
import {
    GetConsultationReviews,
    Review
} from "../../models/Review";

export default function Consultation_controller() {
    const GetConsultations = async (): Promise<Consultation[]> => {
        return await GetConsultationsData();
    };

    const GetConsultation = async (id: string): Promise<Consultation | null> => {
        return await GetConsultationData(id);
    };

    const GetConsultationReviews = async (id: string): Promise<Review | null> => {
        return await GetConsultationReviews(id);
    };

    return {
        GetConsultations,
        GetConsultation,
        GetConsultationReviews
    };
}