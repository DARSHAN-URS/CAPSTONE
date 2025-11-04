import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserSelect from './pages/UserSelect';
import Dashboard from './pages/Dashboard';
import Questionnaire from './pages/Questionnaire';
import PhysicalAssessment from './pages/PhysicalAssessment';
import MentalAssessment from './pages/MentalAssessment';
import CognitiveAssessment from './pages/CognitiveAssessment';
import BiomarkersAssessment from './pages/BiomarkersAssessment';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSelect />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/physical" element={<PhysicalAssessment />} />
        <Route path="/mental" element={<MentalAssessment />} />
        <Route path="/cognitive" element={<CognitiveAssessment />} />
        <Route path="/biomarkers" element={<BiomarkersAssessment />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;

