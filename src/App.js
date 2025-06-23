import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import XeroxDashboard from './pages/XeroxDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<XeroxDashboard />} />
        <Route path="/upload/:id" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
