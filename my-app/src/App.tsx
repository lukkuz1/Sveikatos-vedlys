import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom'; // Importing NavLink from react-router-dom
import './App.css';
import Login from './app/Login/Login';
import Register from './app/Register/Register'; // Assuming you have a Register component
import Missions from './app/Missions/Missions';
import MissionAdd from './app/Missions/add/MissionAdd';

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
        </Routes>
        
      </div>
    </Router>
  );
}