import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import TherapistLayout from './pages/TherapistLayout';
import Dashboard from './pages/Dashboard';

export default function TherapistRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<TherapistLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
