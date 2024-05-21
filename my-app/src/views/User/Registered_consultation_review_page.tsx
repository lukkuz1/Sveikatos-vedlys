import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewController, { Registered_consultation_controller } from "../../controllers/User/Registered_consultation_controller";
import { AddReview, Review } from '../../models/Review';
import Navigation_router_user from "../../controllers/User/Navigation_router_user";

export default function ReviewAdd() {
  const { id } = useParams<{ id?: string }>(); // Note the '?' after 'id', indicating it's optional
  const navigate = useNavigate();
  const [review, setReview] = useState<Review>({ id: "", reviewDate: new Date().toISOString().split('T')[0], reviewDescription: "", reviewAssessment: "" });
  const [descriptionEmpty, setDescriptionEmpty] = useState<boolean>(false);
  const [gradeEmpty, setGradeEmpty] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  }

  const SubmitReviewData = async () => {
    let status = Registered_consultation_controller().VerifyReviewData(review);
    if (status === 1) {
        setDescriptionEmpty(true);
    } else if (status === 2) {
        setGradeEmpty(true);
    } else {
        try {
            if (id) { // Check if id is defined
                await AddReview(id,review); // Pass the consultation ID 'id' along with the review data
                alert("Atsiliepimas sėkmingai pridėtas!");
                Navigation_router_user.RenderReview();
                navigate(-1);
            } else {
                // Handle case where id is undefined
                console.error("Consultation ID is undefined");
                // Optionally, you can provide feedback to the user or handle this case differently
            }
        } catch (error) {
            alert("Klaida " + error);
        }
    }
};


  return (
    <div className="all">
      <div className="add">
        {descriptionEmpty && <p style={{ color: "rgba(255,0,0,1)" }}>Užpildykite aprašymo lauką</p>}
        {gradeEmpty && <p style={{ color: "rgba(255,0,0,1)" }}>Užpildykite vertinimo lauką</p>}
        <h2>Atsiliepimo aprašymas</h2>
        <input type="text" name="reviewDescription" value={review.reviewDescription} onChange={handleChange} />
        <h2>Atsiliepimo įvertinimas</h2>
        <select name="reviewAssessment" value={review.reviewAssessment} onChange={handleChange}>
          <option value="">Pasirinkite įvertinimą</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <br />
        <button onClick={SubmitReviewData}>Pridėti</button>
      </div>
    </div>
  );
}
