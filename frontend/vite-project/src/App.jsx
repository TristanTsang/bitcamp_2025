import { useState } from "react";
import "./App.css";
import { MantineProvider, Button, createTheme } from "@mantine/core";
import { Header } from "./Header";
import "@mantine/core/styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UploadResume from "./pages/UploadResume";
import { useResumeStore } from "./store/useResumeStore";
import { useEffect } from "react";

function App() {
  const { resumes, userResumes, getAllResumes, getUserResumes } =
    useResumeStore();

  useEffect(() => {
    getAllResumes();
    getUserResumes();
  }, [getAllResumes, getUserResumes]);

  console.log(userResumes);
  console.log(resumes);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="dark"
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<UploadResume />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
