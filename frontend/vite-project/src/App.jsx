// App.jsx
import { useState, useEffect } from 'react'
import './App.css'
import { MantineProvider, createTheme } from '@mantine/core';
import { Header } from './Header';
import '@mantine/core/styles.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UploadResume from './pages/UploadResume';
import Results from './pages/Results';
import Leaderboard from './pages/Leaderboard';
import StarryBackground from './StarryBackground.jsx';
import { useAuthStore } from "./store/useAuthStore";

// Create a custom dreamy theme
const dreamyTheme = createTheme({
  colors: {
    purple: [
      '#f2e6ff', // lighter shades
      '#e6ccff',
      '#d9b3ff',
      '#cc99ff',
      '#b366ff',
      '#9933ff', // main purple
      '#8000ff',
      '#6600cc',
      '#4d0099',
      '#330066'  // darker shades
    ],
  },
  primaryColor: 'purple',
  primaryShade: 5,
  colorScheme: 'dark',
  components: {
    Button: {
      defaultProps: {
        color: 'purple.5',
        variant: 'filled',
      },
      styles: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 0 15px rgba(153, 51, 255, 0.5)',
        }
      }
    },
    Card: {
      styles: {
        root: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(25, 10, 41, 0.7)',
          border: '1px solid rgba(153, 51, 255, 0.3)',
          borderRadius: '12px',
        }
      }
    }
  }
});

function App() {
  const { checkAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <MantineProvider 
      theme={dreamyTheme}
      withGlobalStyles
      withNormalizeCSS
    >
      <div className="dreamy-container">
      <StarryBackground />
        <Router>
          <Header/>
          <div className="content">
          <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
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
          </div>
        </Router>
      </div>
    </MantineProvider>
  )
}

export default App