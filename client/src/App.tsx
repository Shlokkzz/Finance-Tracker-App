/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";  

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
