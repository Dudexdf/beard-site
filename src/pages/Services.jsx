import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Skeleton from '../components/Skeleton';
import { supabase } from '../lib/supabase';
import { IMAGES } from '../data/images';

const CATEGORIES = ['Все', 'Стрижки', 'Борода', 'Бритьё', 'Детские'];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все');

  useEffect(() => {
    supabase
      .from('Service')
      .select('*')
      .order('id')
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setServices(data);
        setLoading(false);
      });
  }, []);

  // Фильтр по поиску и категории
  const filtered = services.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      category === 'Все' ||
      (category === 'Стрижки' && s.title.toLowerCase().includes('стрижка') && !s.title.toLowerCase().includes('бород')) ||
      (category === 'Борода' && s.title.toLowerCase().includes('бород')) ||
      (category === 'Бритьё' && s.title.toLowerCase().includes('бритьё')) ||
      (category === 'Детские' && s.title.toLowerCase().includes('детск'));
    return matchSearch && matchCat;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <Breadcrumbs />

      <h1 className="font-heading text-5xl font-bold mb-3">Услуги</h1>
      <p className="text-text-muted mb-8">
        Выберите подходящую услугу и запишитесь онлайн
      </p>

      {/* Поиск + фильтры */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Поиск по названию…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-surface border border-white/10 rounded-lg px-4 py-3 text-text-main focus:border-accent outline-none"
        />

        <div className="flex gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition
                ${category === cat
                  ? 'bg-accent text-bg font-semibold'
                  : 'bg-surface text-text-muted border border-white/10 hover:border-accent/50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-text-muted text-center py-20">Ничего не найдено</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <ServiceCardBig key={s.id} service={s} image={IMAGES[`service${s.id}`] || IMAGES.service1} />
          ))}
        </div>
      )}
    </section>
  );
}

function ServiceCardBig({ service, image }) {
  return (
    <article className="bg-surface border border-white/10 rounded-2xl overflow-hidden hover:border-accent/50 hover:-translate-y-1 transition duration-300 flex flex-col">
      <div className="aspect-video bg-gradient-to-br from-bg to-surface overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={service.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        ) : null}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-xl font-semibold uppercase mb-2">
          {service.title}
        </h3>
        <p className="text-text-muted text-sm mb-4 flex-1">{service.description}</p>

        <div className="flex items-center justify-between border-t border-white/10 pt-4 mb-4">
          <span className="text-accent font-bold text-lg">{service.price} ₽</span>
          <span className="text-text-muted text-sm">⏱ {service.durationMin} мин</span>
        </div>

        <Link
          to="/booking"
          className="block text-center bg-accent text-bg px-5 py-3 rounded-lg font-semibold hover:brightness-110 transition"
        >
          Записаться
        </Link>
      </div>
    </article>
  );
}