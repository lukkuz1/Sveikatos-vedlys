import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetConsultation } from "../../controllers/User/Suggested_consultation_controller";
import { Consultation } from "../../models/Consultation";
import { registerConsultation } from "../../controllers/User/Suggested_consultation_controller";

const RegisterConsultationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleRegister = async () => {
    try {
      if (consultation && consultation.consultationType != "rezerved") {
        await registerConsultation({
          userName: "user123",
          consultationId: consultation.id,
          consultationDescription: consultation.consultationDescription,
        });
        alert(
          "You have registered to the consultation: " +
            consultation.consultationDescription
        );
      }
    } catch (error) {
      alert("Already registered or consultation is rezerved!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <h1>Register for Consultation</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {consultation && (
        <div style={{ border: "1px solid #ccc", padding: 20, margin: 10 }}>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
};

export default RegisterConsultationPage;
