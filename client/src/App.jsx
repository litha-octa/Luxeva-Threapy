import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import CalendarView from './pages/admin/CalendarView';
import BookingList from './pages/admin/BookingList';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<CalendarView />} />
            <Route path="bookings" element={<BookingList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
