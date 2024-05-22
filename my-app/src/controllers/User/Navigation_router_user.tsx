import Chatbot_page from '../../views/User/Chatbot_page';
import Healthy_diary_views_page from '../../views/User/Healthy_diary_views_page';
import Suggested_consultations_view_page from '../../views/User/Suggested_consultations_view_page';
import Suggested_consultation_view_page from '../../views/User/Suggested_consultation_view_page';
import RegisterConsultationPage from '../../views/User/Suggested_consultation_register_page';

import { JsxElement } from 'typescript';

export class Navigation_router_user {

  static RenderChatBot() {
    return <Chatbot_page />;
  }

  static RenderDiaryMainPage() {
    return <Healthy_diary_views_page />;
  }

  static RenderSuggestedConsultation() {
    return <Suggested_consultations_view_page/>;
  }

  static RenderSelectedConsultation() {
    return <Suggested_consultation_view_page/>;
  }

  static RenderConsultationRegister() {
    return <RegisterConsultationPage/>;
  }



}

export default Navigation_router_user;
