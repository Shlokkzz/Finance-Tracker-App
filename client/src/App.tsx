/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <SignedIn>
            <div className="navbar">
              <Link to="/">Dashboard</Link>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </SignedIn>
          <Routes>
            <Route
              path="/"
              element={
                <FinancialRecordsProvider>
                  <Dashboard />
                </FinancialRecordsProvider>
              }
            />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
