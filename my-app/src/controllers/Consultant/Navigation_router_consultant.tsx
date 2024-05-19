import Consultations from '../../views/Consultant/Consultations_view_page';

import Consultation from '../../views/Consultant/Consultation_view_page';

import ConsultationReviews from '../../views/Consultant/Consultation_reviews_view_page';
import { JsxElement } from 'typescript';

export class Navigation_router_consultant {
  static RenderConsultations() {
    return <Consultations />;
  }
  
  static RenderConsultationPage() {
    return <Consultation />;
  }

  static RenderConsultationReviews() {
    return <ConsultationReviews />;
  }
}

export default Navigation_router_consultant;
