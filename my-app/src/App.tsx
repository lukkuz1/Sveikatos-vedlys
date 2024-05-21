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

import Home_consultant from './views/Consultant/Home_consultant';
import Navigation_router_consultant from './controllers/Consultant/Navigation_router_consultant';

import Home_healthy from './views/User/Home_healthy';
import Navigation_router_health from './controllers/Healthy/Navigation_router_health';

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
      <div>
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
            path="/healthy/registeredConsultations" 
            Component={Navigation_router_user.RenderRegisteredConsultationsPage} 
          />
          <Route 
            path="/healthy/registeredConsultation/:id" 
            Component={Navigation_router_user.RenderRegisteredConsultationPage} 
          />
          <Route 
            path="/healthy/registeredConsultation/:id/reviews" 
            Component={Navigation_router_user.RenderReview} 
          />
        </Routes>
      </div>
    </Router>
  );
}
