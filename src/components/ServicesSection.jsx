import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { supabase } from '../lib/supabase';
import FadeIn from './FadeIn';
import Skeleton from './Skeleton';
import { IMAGES } from '../data/images';

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('Service')
      .select('*')
      .limit(3)
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setServices(data);
        setLoading(false);
      });
  }, []);

  return (
    <section id="services" className="py-20 px-4">
      <FadeIn>
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
          Наши услуги
        </h2>
        <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
          Профессиональный уход в комфортной атмосфере
        </p>

          {loading ? (
    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>
  ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard
  key={s.id}
  title={s.title}
  description={s.description}
  price={s.price}
  duration={s.durationMin}
  image={IMAGES[`service${s.id}`] || IMAGES.service1}
/>
            ))}
          </div>
        )}
      </div>
      </FadeIn>
    </section>
  );
}