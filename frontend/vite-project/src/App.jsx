import { useEffect } from "react";
import "./App.css";
import { MantineProvider, Button, createTheme } from "@mantine/core";
import { Header } from "./Header";
import "@mantine/core/styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Results from "./pages/Results";
import Leaderboard from "./pages/Leaderboard";
import UploadResume from "./pages/UploadResume";
import { useAuthStore } from "./store/useAuthStore";
function App() {
  const { checkAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="dark"
    >
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/signup" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/upload" element={<UploadResume />} />
          <Route path="/results" element={<Results />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
