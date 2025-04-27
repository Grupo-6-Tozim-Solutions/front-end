import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import PartsStorage from './pages/PartsStorage';
import CounchPage from './pages/CounchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PartsStorage />} /> {/* Default route */}
        <Route path="/counch" element={<CounchPage />} /> {/* Route for CounchPage */}
      </Routes>
    </Router>
  );
}

export default App;