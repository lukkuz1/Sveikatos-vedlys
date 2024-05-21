import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Consultation_controller from "../../controllers/Consultant/Consultation_controller";
import { Consultation } from '../../models/Consultation';

export default function Health_mission_view_page() {
    const { id } = useParams<{ id: string }>();
    const [consultation, setConsultation] = useState<Consultation | null>(null);

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const consultationData = await Consultation_controller().GetConsultation(id);
                setConsultation(consultationData);
            }
        };
        fetch();
    }, [id]);

    if (!consultation) {
        return <div>Loading...</div>;
    }

    const OpenReviewPage = (consultationID: string) => {
        return <Link to={`/healthy/registeredConsultation/${consultationID}/reviews`}>Parašyti atsiliepimą</Link>;
    };
    
    return (
        <div className="mission">
            <h1>Registered consultation detail</h1>
            <table>
                <thead>
                    <tr>
                        <th>Consultation ID</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Link</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{consultation.id}</td>
                        <td>{consultation.consultationDescription}</td>
                        <td>{consultation.consultationType}</td>
                        <td>{consultation.consultationLink}</td>
                        <td>{consultation.consultationTime}</td>
                        <td>{OpenReviewPage(consultation.id)} | Atšaukti</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
