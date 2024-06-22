import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Activities from "./pages/Activities";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/activity" element={<Activities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/project/:id" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
