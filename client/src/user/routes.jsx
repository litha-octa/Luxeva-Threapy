import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

export default function UserRoutes() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
    </Routes>
  );
}
