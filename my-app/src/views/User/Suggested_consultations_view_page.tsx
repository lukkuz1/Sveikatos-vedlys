import React, { useState, useEffect } from "react";
import SuggestedConsultationController from "../../controllers/User/Suggested_consultation_controller"; // Update the path as necessary
import { Consultation } from "../../models/Consultation";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Review } from "../../models/Review";
import { Diary } from "../../models/Diary";

const Registered_consultations_view_page: React.FC = () => {
  const [selectedCount, SubmitConsultationCount] = useState<number | null>(
    null
  );
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [personalizedReviewList, setPersonalizedReviewList] = useState(false);
  const [personalizedDiaryList, setPersonalizedDiaryList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (selectedCount !== null) {
          const data =
            await SuggestedConsultationController.GetUserConsultations();
          if (data && Array.isArray(data)) {
            setConsultations(data.slice(0, selectedCount));
          } else {
            setError("Error fetching consultations");
          }
        }
      } catch (error) {
        setError("Error fetching consultations");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCount]);

  const OpenSingleConsultation = (id: string) => {
    navigate(`/suggested_consultation/${id}`);
  };

  const fetchReviews = async () => {
    try {
      const reviewsData =
        await SuggestedConsultationController.GetUserReviews();
      if (reviewsData.length > 0) {
        await AnalyzeUserReviews(reviewsData);
      } else {
        setPersonalizedReviewList(false);
      }
    } catch (error) {
      console.error("Error fetching reviews data:", error);
    }
  };

  const fetchDiary = async () => {
    try {
      const diaryData = await SuggestedConsultationController.GetDiaryData();
      if (diaryData.length > 0) {
        await AnalyzeDiaryData(diaryData);
      } else {
        setPersonalizedDiaryList(false);
      }
    } catch (error) {
      console.error("Error fetching diary data:", error);
    }
  };

  const AnalyzeUserReviews = async (reviewsData: Review[]) => {
    try {
      const hasPositiveReviews = reviewsData.some(
        (review) => parseFloat(review.reviewAssessment) > 8
      );
      console.log("Has positive reviews:", hasPositiveReviews);
      if (hasPositiveReviews) {
        const filteredConsultations = consultations.filter((consultation) => {
          const matches = reviewsData.some((review) => {
            const assessment = parseFloat(review.reviewAssessment);
            const match =
              review.id === consultation.id &&
              !isNaN(assessment) &&
              assessment > 8;
            console.log("Review:", review);
            console.log("Consultation:", consultation);
            console.log("Match:", match);
            return match;
          });
          console.log(
            "Filtered consultation:",
            consultation,
            "Matches:",
            matches
          );
          return matches;
        });
        console.log("Filtered consultations:", filteredConsultations);
        setConsultations(filteredConsultations);
        setPersonalizedReviewList(true);
      }
    } catch (error) {
      console.error("Error analyzing user reviews:", error);
      setPersonalizedReviewList(false);
    }
  };

  const AnalyzeDiaryData = async (diaryData: Diary[]) => {
    try {
      const hasRelevantDiaryEntries = diaryData.some((entry) => {
        return (
          entry.mood_change !== undefined &&
          entry.mood_change.toLowerCase() === "positive"
        );
      });
      if (hasRelevantDiaryEntries) {
        const filteredConsultations = consultations.filter((consultation) => {
          return consultation.consultationType
            .toLowerCase()
            .includes("positive");
        });
        setConsultations(filteredConsultations);
        setPersonalizedDiaryList(true);
      }
    } catch (error) {
      console.error("Error analyzing diary data:", error);
      setPersonalizedDiaryList(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchDiary();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <select
        value={selectedCount || ""}
        onChange={(e) =>
          SubmitConsultationCount(parseInt(e.target.value, 10) || null)
        }
      >
        <option value="">Select Count</option>
        {[5, 10, 15, 20].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      {selectedCount !== null && (
        <>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <div>
            {personalizedReviewList ||
              (personalizedDiaryList && <p>Personalized list</p>)}
            {consultations.map((consultation) => (
              <div
                key={consultation.id}
                style={{ border: "1px solid #ccc", padding: 20, margin: 10 }}
              >
                <h2>{consultation.consultationDescription}</h2>
                <p>Link: {consultation.consultationLink}</p>
                <p>Type: {consultation.consultationType}</p>
                <p>Time: {consultation.consultationTime}</p>
                <div>
                  <button
                    onClick={() => OpenSingleConsultation(consultation.id)}
                  >
                    View consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Registered_consultations_view_page;
