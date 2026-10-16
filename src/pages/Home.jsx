import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import MastersSection from '../components/MastersSection';
import WorksSlider from '../components/WorksSlider';
import ReviewsSection from '../components/ReviewsSection';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <MastersSection />
      <WorksSlider />
      <ReviewsSection />
      <CTA />
    </>
  );
}