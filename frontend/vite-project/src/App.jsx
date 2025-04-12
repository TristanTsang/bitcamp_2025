import { useState } from 'react'
import './App.css'
import { MantineProvider, Button, createTheme } from '@mantine/core';
import { Header } from './Header';
import '@mantine/core/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {

  const theme = createTheme({
    colorScheme: 'dark', // 👈 This is what applies dark mode now
  });

  return (
    <MantineProvider withGlobalStyles
    withNormalizeCSS
    theme={theme}>
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </MantineProvider>
  )
}

export default App
