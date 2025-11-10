import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MenteeOnboarding from './pages/MenteeOnboarding';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/find-a-mentor" element={<MenteeOnboarding />} />
      </Routes>
    </Router>
  );
}

export default App;
