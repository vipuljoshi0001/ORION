import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore.js';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProblemOfDay from './pages/ProblemOfDay.jsx';
import ProblemLibrary from './pages/ProblemLibrary.jsx';
import ProblemSolve from './pages/ProblemSolve.jsx';
import Profile from './pages/Profile.jsx';

const Guard = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Guard><Dashboard /></Guard>} />
        <Route path="/today" element={<Guard><ProblemOfDay /></Guard>} />
        <Route path="/problems" element={<Guard><ProblemLibrary /></Guard>} />
        <Route path="/problems/:id" element={<Guard><ProblemSolve /></Guard>} />
        <Route path="/profile" element={<Guard><Profile /></Guard>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}