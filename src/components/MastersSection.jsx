import { useEffect, useState } from 'react';
import MasterCard from './MasterCard';
import { supabase } from '../lib/supabase';
import FadeIn from './FadeIn';
import Skeleton from './Skeleton';
import { IMAGES } from '../data/images';

export default function MastersSection() {
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('Master')
      .select('*')
      .limit(3)
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setMasters(data);
        setLoading(false);
      });
  }, []);

  return (
    <section id="masters" className="py-20 px-4 bg-surface/30">
      <FadeIn>
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
          Наши мастера
        </h2>
        <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
          Опытные барберы с многолетним стажем
        </p>

          {loading ? (
  <div className="grid md:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-72" />
    ))}
  </div>
) : (
          <div className="grid md:grid-cols-3 gap-6">
            {masters.map((m) => (
              <MasterCard
  key={m.id}
  name={m.name}
  specialization={m.specialization}
  rating={m.rating}
  image={IMAGES[`master${m.id}`] || IMAGES.master1}
/>
            ))}
          </div>
        )}
      </div>
      </FadeIn>
    </section>
  );
}