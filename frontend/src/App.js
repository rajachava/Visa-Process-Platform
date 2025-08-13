import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Applications from './pages/Applications';
import Documents from './pages/Documents';
import Payments from './pages/Payments';
import ApplicationStatus from './pages/ApplicationStatus';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/" element={<Applications />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/:applicationId/documents" element={<Documents />} />
        <Route path="/applications/:applicationId/payments" element={<Payments />} />
        <Route path="/applications/:applicationId/status" element={<ApplicationStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
