import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './shared/contexts/AuthContext';
import UserRoutes from './user/routes';
import TherapistRoutes from './therapist/routes';
import AdminRoutes from './admin/routes';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/therapist/*" element={<TherapistRoutes />} />
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
