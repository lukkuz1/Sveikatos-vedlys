import Chatbot_page from '../../views/User/Chatbot_page';
import Healthy_diary_view_page from '../../views/User/Healthy_diary_view_page';
import Healthy_diary_views_page from '../../views/User/Healthy_diary_views_page';
import { JsxElement } from 'typescript';

export class Navigation_router_user {

  static RenderChatBot() {
    return <Chatbot_page />;
  }

  static RenderDiaryMainPage() {
    return <Healthy_diary_views_page />;
  }

  static RenderDiaryEntryPage() {
    return <Healthy_diary_view_page />;
  }

}

export default Navigation_router_user;
