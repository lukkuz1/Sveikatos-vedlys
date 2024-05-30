import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom"; // Importing NavLink from react-router-dom
import "./App.css";
import Navigation_router_admin from "./controllers/Admin/Navigation_router_admin";
import Home_admin from "./views/Admin/Home_admin";
import Navigation_router_user from "./controllers/User/Navigation_router_user";
import AddDiaryEntryPage from "./views/User/Healthy_diary_add_page";
import ViewDiaryEntryPage from "./views/User/Healthy_diary_view_page";
import EditDiaryEntryPage from "./views/User/Healthy_diary_edit_page";
import RemoveDiaryEntryPage from "./views/User/Healthy_diary_remove_page";
import AddRecordPage from "./views/User/Healthy_diary_record_add_page";
import ViewRecordPage from "./views/User/Healthy_diary_view_records_page";
import EditRecordPage from "./views/User/Healthy_diary_record_edit_page";
import RemoveRecordPage from "./views/User/Healthy_diary_record_remove_page";
import AddSportActivityPage from "./views/User/Healthy_diary_sport_activity_add_page";
import AddDietPage from "./views/User/Healthy_diary_diet_add_page";

import Home_consultant from './views/Consultant/Home_consultant';
import Navigation_router_consultant from './controllers/Consultant/Navigation_router_consultant';

import Home_healthy from './views/User/Home_healthy';
import Navigation_router_health from './controllers/Healthy/Navigation_router_health';
import { MealProvider } from "./hooks/MealContext";

function App() {
  let signedIn = true;
  let isAdmin = true;
  let isHealthy = true;
  let isConsultant = true;
  let isGuest = false;
  let isUser = true;

  return (
    <div className="App">
      <p>
        <a href="/">Sveikatos vedlys</a>
      </p>

      {!signedIn && (
        <>
          <NavLink to="/login">
            <button>Prisijungti</button>
          </NavLink>

          <NavLink to="/register">
            <button>Registruotis</button>
          </NavLink>
        </>
      )}

      {signedIn && isAdmin && (
        <>
          <NavLink to="/admin">
            <button>Administratoriaus sąsaja</button>
          </NavLink>
        </>
      )}
      {signedIn && isConsultant && (
        <>
          <NavLink to="/consultant">
            <button>Konsultanto sąsaja</button>
          </NavLink>
        </>
      )}
      {signedIn && isHealthy && (
        <>
          <NavLink to="/healthy">
            <button>Naudotojo sąsaja</button>
          </NavLink>
        </>
      )}
    </div>
  );
}

export default function MainApp() {
  return (
    <Router>
      <MealProvider>
        <App />
        <Routes>
          {/*<Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />*/}
          <Route path="/admin" Component={Home_admin} />
          {/* Consultant */}
          <Route path="/consultant" Component={Home_consultant} />
          <Route path="/consultant/consultations" Component={Navigation_router_consultant.RenderConsultations} />
          <Route path="/consultant/consultation/:id" Component={Navigation_router_consultant.RenderConsultationPage} />
          <Route path="/consultant/consultation/:id/reviews" Component={Navigation_router_consultant.RenderConsultationReviews} />
          {/* Healthy */}
          <Route path="/healthy" Component={Home_healthy} />
          <Route path="/healthy/missions" Component={Navigation_router_health.RenderHealthMissionsPage} />
          <Route
            path="/diet_plan"
            Component={Navigation_router_health.RenderDietPlanPage}
          />

          <Route
            path="/diet_plan/criteria_page"
            Component={Navigation_router_health.RenderDietCriteriaPage}
          />

          <Route
            path="/diet_plan/closest_shop_criteria_page/:id"
            Component={Navigation_router_health.RenderClosestShopCriteriaPage}
          />

          <Route
            path="/diet_plan/closest_shop_page/"
            Component={Navigation_router_health.RenderBestShop}
          />

          <Route
            path="/admin/missions"
            Component={Navigation_router_admin.RenderHealthMissionsPage}
          />
          <Route
            path="/admin/missions/add"
            Component={Navigation_router_admin.RenderHealthMissionAddPage}
          />
          <Route
            path="/admin/missions/:id"
            Component={Navigation_router_admin.RenderHealthMissionPage}
          />
          <Route
            path="/admin/missions/:id/edit"
            Component={Navigation_router_admin.RenderHealthMissionEditPage}
          />
          <Route
            path="/healthy/chatbot"
            Component={Navigation_router_user.RenderChatBot}
          />

          <Route
            path="/healthy/diary"
            Component={Navigation_router_user.RenderDiaryMainPage}
          />

          <Route
            path="/suggested_consultation"
            Component={Navigation_router_user.RenderSuggestedConsultation}
          />

          <Route
            path="/suggested_consultation/:id"
            Component={Navigation_router_user.RenderSelectedConsultation}
          />

          <Route
            path="/suggested_consultation/:id/register"
            Component={Navigation_router_user.RenderConsultationRegister}
          />

          <Route path="/healthy/diary/add" Component={AddDiaryEntryPage} />

          <Route
            path="/healthy/diary/view/:id"
            Component={ViewDiaryEntryPage}
          />

          <Route
            path="/healthy/diary/edit/:id"
            Component={EditDiaryEntryPage}
          />

          <Route
            path="/healthy/diary/remove/:id"
            Component={RemoveDiaryEntryPage}
          />

          <Route
            path="/healthy/diary/view/:id/add-record"
            Component={AddRecordPage}
          />

          <Route
            path="/healthy/diary/view/:id/record/view/:recordId"
            Component={ViewRecordPage}
          />

          <Route
            path="/healthy/diary/view/:id/record/view/:recordId/remove"
            Component={RemoveRecordPage}
          />

          <Route
            path="/healthy/diary/view/:id/record/view/:recordId/edit"
            Component={EditRecordPage}
          />

          <Route
            path="/healthy/diary/view/:id/record/view/:recordId/sport_activity/add"
            Component={AddSportActivityPage}
          />

          <Route
            path="/healthy/diary/view/:id/record/view/:recordId/diet/add"
            Component={AddDietPage}
          />


        </Routes>
      </MealProvider>
    </Router>

  );
}
