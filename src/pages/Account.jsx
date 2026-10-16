import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Account() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Если не залогинен — отправляем на /login
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Загружаем записи пользователя
  useEffect(() => {
    if (!user) return;

    const loadAppointments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Appointment')
        .select(`
          id,
          appointmentDate,
          appointmentTime,
          status,
          Service (title, price),
          Master (name, specialization)
        `)
        .eq('userId', user.id)
        .order('appointmentDate', { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setAppointments(data || []);
      }
      setLoading(false);
    };

    loadAppointments();
  }, [user]);

  const cancelAppointment = async (id) => {
    if (!confirm('Отменить эту запись?')) return;

    const { error } = await supabase
      .from('Appointment')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (error) {
      alert('Не удалось отменить: ' + error.message);
    } else {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
      );
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success border-success/40 bg-success/10';
      case 'cancelled': return 'text-error border-error/40 bg-error/10';
      case 'done': return 'text-text-muted border-white/20 bg-white/5';
      default: return 'text-accent border-accent/40 bg-accent/10';
    }
  };

  const statusLabel = (status) => {
    switch (status) {
      case 'confirmed': return 'Подтверждено';
      case 'cancelled': return 'Отменено';
      case 'done': return 'Завершено';
      default: return 'Ожидает';
    }
  };

  if (authLoading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24">
        <p className="text-text-muted">Загрузка…</p>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">
        Привет, {user.user_metadata?.name || user.email}!
      </h1>
      <p className="text-text-muted mb-10">Здесь ваши записи в барбершоп</p>

      {loading ? (
        <p className="text-text-muted">Загрузка записей…</p>
      ) : appointments.length === 0 ? (
        <div className="bg-surface border border-white/10 rounded-xl p-10 text-center">
          <p className="text-text-muted mb-6">У вас пока нет записей</p>
          <Link
            to="/booking"
            className="inline-block bg-accent text-bg px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Записаться сейчас
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((a) => {
            const date = new Date(a.appointmentDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = date.toLocaleString('ru', { month: 'short' });

            return (
              <div
                key={a.id}
                className="bg-surface border border-white/10 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-5"
              >
                {/* Дата */}
                <div className="flex flex-col items-center justify-center bg-bg rounded-lg px-5 py-3 md:min-w-[90px]">
                  <span className="font-heading text-3xl font-bold text-accent leading-none">{day}</span>
                  <span className="text-text-muted text-xs uppercase mt-1">{month}</span>
                </div>

                {/* Информация */}
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-semibold mb-1">
                    {a.Service?.title || '—'}
                  </h3>
                  <p className="text-text-muted text-sm">
                    Мастер: {a.Master?.name || '—'} · {a.appointmentTime}
                  </p>
                </div>

                {/* Статус */}
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${statusColor(a.status)} whitespace-nowrap`}
                >
                  {statusLabel(a.status)}
                </span>

                {/* Кнопки */}
                {a.status !== 'cancelled' && a.status !== 'done' && (
                  <button
                    onClick={() => cancelAppointment(a.id)}
                    className="text-error border border-error/40 hover:bg-error/10 px-4 py-2 rounded-lg text-sm transition"
                  >
                    Отменить
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}