import HealthMissions from '../../views/Healthy/Health_missions_view_page';
import { JsxElement } from 'typescript';
import Diet_plan_view_page from '../../views/Healthy/Diet_plan_view_page';
import Diet_plan_criteria_page from '../../views/Healthy/Diet_plan_criteria_page';
import Closest_shop_criteria_page from '../../views/Healthy/Closest_shop_criteria_page';
import Closest_shop_page from '../../views/Healthy/Closest_shop_page';


export class Navigation_router_health {
  static RenderHealthMissionsPage() {
    return <HealthMissions />;
  }

  static RenderDietPlanPage() {
    return <Diet_plan_view_page />;
  }

  static RenderDietCriteriaPage() {
    return <Diet_plan_criteria_page />;
  }

  static RenderClosestShopCriteriaPage() {
    return <Closest_shop_criteria_page />
  }

  static RenderBestShop() {
    return <Closest_shop_page />
  }
}

export default Navigation_router_health;
