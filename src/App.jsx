import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth';
import SuperAdminDashboard from './pages/SAdminDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/userdashboard';
import AgentDashboard from './pages/agent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/SAdminDashboard" element={<SuperAdminDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/UserDashboard" element={<UserDashboard/>} />
        <Route path="/AgentDashboard" element={<AgentDashboard/>} />

      </Routes>
    </Router>
  );
}

export default App;