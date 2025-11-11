import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppNavbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";


function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/me" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;

