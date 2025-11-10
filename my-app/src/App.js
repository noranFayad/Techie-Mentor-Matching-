import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MatchesPage from './pages/MatchesPage';
import MenteeOnboarding from './pages/MenteeOnboarding';
import MentorOnboarding from './pages/MentorOnboarding';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/find-a-mentor" element={<MenteeOnboarding />} />
        <Route path="/become-a-mentor" element={<MentorOnboarding />} />
        <Route path="/matches" element={<MatchesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
