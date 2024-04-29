import HealthMission from '../../views/Admin/Health_mission_view_page';
import HealthMissions from '../../views/Admin/Health_missions_view_page';
import HealthMissionAdd from '../../views/Admin/Health_mission_add_page';
import HealthMissionEdit from '../../views/Admin/Health_mission_edit_page';
import { JsxElement } from 'typescript';

export class Navigation_router_admin {
  static RenderHealthMissionPage() {
    return <HealthMission />;
  }
  static RenderHealthMissionsPage() {
    return <HealthMissions />;
  }

  static RenderHealthMissionAddPage() {
    return <HealthMissionAdd />;
  }

  static RenderHealthMissionEditPage() {
    return <HealthMissionEdit />;
  }
}

export default Navigation_router_admin;
