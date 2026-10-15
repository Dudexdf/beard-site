import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { supabase } from '../lib/supabase';

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
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
          Наши услуги
        </h2>
        <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
          Профессиональный уход в комфортной атмосфере
        </p>

        {loading ? (
          <p className="text-center text-text-muted">Загрузка…</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard
                key={s.id}
                title={s.title}
                description={s.description}
                price={s.price}
                duration={s.durationMin}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}