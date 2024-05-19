import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Consultation_controller from "../../controllers/Consultant/Consultation_controller";
import { GetConsultationReviews, Review } from '../../models/Review';

export default function Health_mission_view_page() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (id) {
                    const reviewsData = await GetConsultationReviews(id);
                    setReviews(reviewsData);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [id]);

    if (reviews.length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div className="all">
            <div className="read">
                <h1>Consultation Reviews</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Review ID</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Assessment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review.id}>
                                <td>{review.id}</td>
                                <td>{review.reviewDescription}</td>
                                <td>{review.reviewDate}</td>
                                <td>{review.reviewAssessment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
