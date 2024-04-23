import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom'; // Importing NavLink from react-router-dom
import './App.css';
import Login from './views/Login/Login';
import Register from './views/Register/Register'; // Assuming you have a Register component
import Missions from './views/Missions/Missions';
import MissionAdd from './views/Missions/add/MissionAdd';
import Mission from './views/Missions/[id]/Mission';
import MissionRemove from './views/Missions/[id]/remove/MissionRemove';
import MissionUpdate from './views/Missions/[id]/update/MissionUpdate';

function App() {
  let signedIn = true; // Change this to true or false to see different button sets
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

      {signedIn && (
        <>
        <NavLink to="/missions">
          <button>Misijos</button>
        </NavLink>
        <NavLink to="/missions/add">
        <button>Pridėti misiją</button>
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
         
        <Route path="/login" Component={Login} /> {/* Using "component" instead of "Component" */}
        <Route path="/register" Component={Register} /> {/* Using "component" instead of "Component" */}
        <Route path="/missions" Component={Missions} /> {/* Using "component" instead of "Component" */}
        <Route path="/missions/add" Component={MissionAdd} /> {/* Using "component" instead of "Component" */}
        <Route path="/missions/:id" Component={Mission} />
        <Route path="/missions/:id/remove" Component={MissionRemove} />
        <Route path="/missions/:id/update" Component={MissionUpdate} />
        </Routes>
        
      </div>
    </Router>
  );
}