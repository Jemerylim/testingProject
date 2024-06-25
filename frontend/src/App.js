import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EventDetailPage from './pages/EventDetailPage';
import TicketPage from './pages/TicketPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CompletionPage from './pages/CompletionPage';
import { AuthProvider } from './context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AdminDashboard from './pages/AdminDashboard';



const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/event/:eventId" element={<EventDetailPage />} />
            <Route path="/ticket/:eventId" element={<TicketPage />} />
            <Route path="/completion" element={<CompletionPage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
