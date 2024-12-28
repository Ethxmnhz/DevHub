import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Editor from "./Editor";
import ProjectManagementPage from "./ProjectManagementPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/ProjectManagementPage" element={<ProjectManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
