import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import MasterCard from '../components/MasterCard';
import { supabase } from '../lib/supabase';
import Skeleton from '../components/Skeleton';
import { IMAGES } from '../data/images';

export default function Masters() {
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('Master')
      .select('*')
      .order('rating', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setMasters(data);
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <Breadcrumbs />
      <h1 className="font-heading text-5xl font-bold mb-6">Мастера</h1>
      <p className="text-text-muted mb-8">Выберите своего барбера</p>

    {loading ? (
    <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
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
    </section>
  );
}