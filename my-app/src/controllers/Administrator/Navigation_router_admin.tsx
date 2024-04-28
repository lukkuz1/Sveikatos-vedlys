import Missions from '../../views/Missions/Health_missions_view_page';
import MissionAdd from '../../views/Missions/add/Health_mission_add_page';
import Mission from '../../views/Missions/[id]/Health_mission_view_page';
import MissionRemove from '../../views/Missions/[id]/remove/Health_mission_delete_page';
import MissionUpdate from '../../views/Missions/[id]/update/MissionUpdate';

export function RenderMissionPage() {
    return <Mission />;
  }
  export function RenderMissionsPage() {
    return <Missions />;
  }
  
  export function RenderMissionAddPage() {
    return <MissionAdd />;
  }
  
  export function RenderMissionEditPage() {
    return <MissionUpdate />;
  }
  
  export function RenderMissionRemovePage() {
    return <MissionRemove />;
  }