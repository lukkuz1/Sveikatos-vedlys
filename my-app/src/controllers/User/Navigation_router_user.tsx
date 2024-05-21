import Chatbot_page from '../../views/User/Chatbot_page';
import Registered_consultations_view_page from '../../views/User/Registered_consultations_view_page';
import Registered_consultation_view_page from '../../views/User/Registered_consultation_view_page';
import Registered_consultation_review_page from '../../views/User/Registered_consultation_review_page';
import { JsxElement } from 'typescript';

export class Navigation_router_user {

  static RenderChatBot() {
    return <Chatbot_page />;
  }
  static RenderRegisteredConsultationsPage() {
    return <Registered_consultations_view_page />;
  }
  static RenderRegisteredConsultationPage() {
    return <Registered_consultation_view_page />;
  }
  static RenderReview() {
    return <Registered_consultation_review_page />;
  }

}

export default Navigation_router_user;
