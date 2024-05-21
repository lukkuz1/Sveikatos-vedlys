import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Consultation_controller from "../../controllers/Consultant/Consultation_controller";
import { Consultation } from '../../models/Consultation';


export default function Registered_consultations_view_page() {

    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [filter] = useState<string>(('registruota'));

    useEffect(() => {
        const fetch = async () => {
            try {
                const consultationsData = await Consultation_controller().GetConsultations();
                setConsultations(consultationsData);
            }
            catch (error) {
                console.log(error)
            }
        };

        fetch();
    }, []);

    const filteredMissions = consultations.filter(consultation => consultation.status === filter);

    const OpenConsultationPage = (consultationID: string) => {
        return <Link to={`/healthy/registeredConsultation/${consultationID}`}>Peržiūrėti</Link>;
    };

    return (
        <div className="all">
            <div className="read">
                <h1>Registered Consultation List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Consultation ID</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Link</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMissions.map((consultation) => (
                            <tr key={consultation.id}>
                                <td>{consultation.id}</td>
                                <td>{consultation.consultationDescription}</td>
                                <td>{consultation.consultationType}</td>
                                <td>{consultation.consultationLink}</td>
                                <td>{consultation.consultationTime}</td>
                                <td>{consultation.status}</td>
                                <td>{OpenConsultationPage(consultation.id)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
