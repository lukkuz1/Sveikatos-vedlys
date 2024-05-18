import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom'; // Importing NavLink from react-router-dom
import './App.css';
import Navigation_router_admin from './controllers/Admin/Navigation_router_admin';
import Home_admin from './views/Admin/Home_admin';


function App() {
  let signedIn = true;
  let isAdmin = true;
  let isHealthy = false;
  let isConsultant = false;
  let isGuest = false;
  let isUser = false;

  return (
    <div className="App">
      <p><a href='/'>Sveikatos vedlys</a></p>

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
          <Route path="/admin/missions" Component={Navigation_router_admin.RenderHealthMissionsPage} />
          <Route path="/admin/missions/add" Component={Navigation_router_admin.RenderHealthMissionAddPage} />
          <Route path="/admin/missions/:id" Component={Navigation_router_admin.RenderHealthMissionPage} />
          <Route path="/admin/missions/:id/edit" Component={Navigation_router_admin.RenderHealthMissionEditPage} />
        </Routes>
      </div>
    </Router>
  );
}
