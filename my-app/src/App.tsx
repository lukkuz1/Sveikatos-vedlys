
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom"; // Importing NavLink from react-router-dom
import "./App.css";
import Navigation_router_admin from "./controllers/Administrator/Navigation_router_admin";
import Home_admin from "./views/Admin/Home_admin";
import Home_healthy from "./views/User/Home_healthy";
import Navigation_router_user from "./controllers/User/Navigation_router_user";


function App() {
  let signedIn = true;
  let isAdmin = true;
  let isHealthy = true;
  let isConsultant = false;
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

          <Route path="/healthy" Component={Home_healthy} />
          <Route
            path="/healthy/chatbot"
            Component={Navigation_router_user.RenderChatBot}
          />

          <Route
            path="/healthy/diarypage"
            Component={Navigation_router_user.RenderDiaryMainPage}
          />

          <Route
            path="/healthy/diarypage/entry"
            Component={Navigation_router_user.RenderDiaryEntryPage}
          />
        </Routes>
      </div>
    </Router>
  );
}
