import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Masters from './pages/Masters';
import Booking from './pages/Booking';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import BookingSuccess from './pages/BookingSuccess';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Страницы с Header и Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/success" element={<BookingSuccess />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Страницы без Header и Footer — только форма */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}