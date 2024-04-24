import Missions from '../../views/Missions/Missions';
import MissionAdd from '../../views/Missions/add/MissionAdd';
import Mission from '../../views/Missions/[id]/Mission';
import MissionRemove from '../../views/Missions/[id]/remove/MissionRemove';
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