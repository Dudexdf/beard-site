import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import MastersSection from './components/MastersSection';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <MastersSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}