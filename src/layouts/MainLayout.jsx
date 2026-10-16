import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ScrollToTopButton from '../components/ScrollToTopButton';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScrollToTop />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}