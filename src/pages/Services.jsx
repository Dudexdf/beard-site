import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { supabase } from '../lib/supabase';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
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

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <Breadcrumbs />
      <h1 className="font-heading text-5xl font-bold mb-6">Услуги</h1>
      <p className="text-text-muted mb-8">Выберите услугу и запишитесь онлайн</p>

      <input
        type="text"
        placeholder="Поиск по названию…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 w-full md:w-1/3 bg-surface border border-white/10 rounded-lg px-4 py-3 text-text-main"
      />

      {loading ? (
        <p className="text-text-muted">Загрузка…</p>
      ) : filtered.length === 0 ? (
        <p className="text-text-muted">Ничего не найдено</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-surface text-text-muted">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Название</th>
                <th className="p-4">Описание</th>
                <th className="p-4">Цена</th>
                <th className="p-4">Длительность</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-t border-white/10 hover:bg-surface/50">
                  <td className="p-4">{s.id}</td>
                  <td className="p-4 font-semibold">{s.title}</td>
                  <td className="p-4 text-text-muted">{s.description}</td>
                  <td className="p-4 text-accent">{s.price} ₽</td>
                  <td className="p-4">{s.durationMin} мин</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}