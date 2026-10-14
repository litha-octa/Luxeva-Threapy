import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminLayout from './pages/AdminLayout';
import CalendarView from './pages/CalendarView';
import BookingList from './pages/BookingList';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<AdminLayout />}>
        <Route index element={<CalendarView />} />
        <Route path="bookings" element={<BookingList />} />
      </Route>
    </Routes>
  );
}
