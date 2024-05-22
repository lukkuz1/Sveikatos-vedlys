import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GetConsultation } from "../../controllers/User/Suggested_consultation_controller";
import { Consultation } from "../../models/Consultation";

const SuggestedConsultationViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultation = async () => {
      setLoading(true);
      setError(null);
      try {
        if (id) {
          const data = await GetConsultation(id);
          if (data) {
            setConsultation(data);
          } else {
            setError("Consultation not found");
          }
        }
      } catch (error) {
        setError("Error fetching consultation");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultation();
  }, [id]);

  const OpenList = () => {
    navigate(`/suggested_consultation`)
  }

  const OpenRegister = (id: string) => {
    navigate(`/suggested_consultation/${id}/register`)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
            <button onClick={OpenList}>Go back to list</button>
          </div>
      {consultation && (
        <div style={{ border: "1px solid #ccc", padding: 20, margin: 10 }}>
          <h2>{consultation.consultationDescription}</h2>
          <p>Link: {consultation.consultationLink}</p>
          <p>Type: {consultation.consultationType}</p>
          <p>Time: {consultation.consultationTime}</p>
          <div>
            <button onClick={()=>OpenRegister(consultation.id)}>Register</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestedConsultationViewPage;
