import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom'; // Importing NavLink from react-router-dom
import './App.css';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Missions from './views/Missions/Missions';
import MissionAdd from './views/Missions/add/MissionAdd';
import Mission from './views/Missions/[id]/Mission';
import MissionRemove from './views/Missions/[id]/remove/MissionRemove';
import MissionUpdate from './views/Missions/[id]/update/MissionUpdate';

function App() {
  let signedIn = true;
  let isAdmin = true;
  return (
    <div className="App">
      <p>Sveikatos vedlys</p>

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
        <NavLink to="/missions">
          <button>Misijos</button>
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
         
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/missions" Component={Missions} />
        <Route path="/missions/add" Component={MissionAdd} />
        <Route path="/missions/:id" Component={Mission} />
        <Route path="/missions/:id/remove" Component={MissionRemove} />
        <Route path="/missions/:id/update" Component={MissionUpdate} />
        </Routes>
        
      </div>
    </Router>
  );
}