import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { IMAGES } from '../data/images';

const TIME_SLOTS = ['10:00', '11:30', '13:00', '15:00', '17:30', '19:00'];
const STEPS = ['Услуга', 'Мастер', 'Дата', 'Время', 'Подтверждение'];

export default function Booking() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [masters, setMasters] = useState([]);
  const [busySlots, setBusySlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    serviceId: null,
    masterId: null,
    date: '',
    time: '',
  });

  useEffect(() => {
    const load = async () => {
      const [s, m] = await Promise.all([
        supabase.from('Service').select('*').order('id'),
        supabase.from('Master').select('*').order('name'),
      ]);
      if (s.data) setServices(s.data);
      if (m.data) setMasters(m.data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (!form.masterId || !form.date) return;
    const load = async () => {
      const { data } = await supabase
        .from('Appointment')
        .select('appointmentTime')
        .eq('masterId', form.masterId)
        .eq('appointmentDate', form.date)
        .in('status', ['pending', 'confirmed']);
      setBusySlots(data?.map((a) => a.appointmentTime) || []);
    };
    load();
  }, [form.masterId, form.date]);

  const next = () => {
    setError('');
    if (step === 1 && !form.serviceId) return setError('Выберите услугу');
    if (step === 2 && !form.masterId) return setError('Выберите мастера');
    if (step === 3 && !form.date) return setError('Выберите дату');
    if (step === 4 && !form.time) return setError('Выберите время');
    setStep(step + 1);
  };

  const back = () => setStep(step - 1);

  const submit = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setError('');
    const { error: err } = await supabase.from('Appointment').insert({
      userId: user.id,
      masterId: form.masterId,
      serviceId: form.serviceId,
      appointmentDate: form.date,
      appointmentTime: form.time,
      status: 'pending',
    });

    if (err) {
      setError('Ошибка: ' + err.message);
    } else {
      navigate('/booking/success', {
        state: {
          service: services.find((s) => s.id === form.serviceId),
          master: masters.find((m) => m.id === form.masterId),
          date: form.date,
          time: form.time,
        },
      });
    }
  };

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-24">
        <p className="text-text-muted">Загрузка…</p>
      </section>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const selectedService = services.find((s) => s.id === form.serviceId);
  const selectedMaster = masters.find((m) => m.id === form.masterId);

  return (
    <section className="max-w-6xl mx-auto px-4 py-24">
      <Breadcrumbs />

      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-10">
        Запись онлайн
      </h1>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-12 max-w-3xl">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const isDone = n < step;
          const isActive = n === step;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition
                    ${isDone ? 'bg-accent text-bg border-accent' : ''}
                    ${isActive ? 'border-accent text-accent' : ''}
                    ${!isDone && !isActive ? 'border-white/20 text-text-muted' : ''}
                  `}
                >
                  {isDone ? '✓' : n}
                </div>
                <span className={`text-xs mt-2 whitespace-nowrap ${isActive ? 'text-accent font-semibold' : 'text-text-muted'}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 mb-5 ${n < step ? 'bg-accent' : 'bg-white/10'}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ЛЕВАЯ ЧАСТЬ */}
        <div className="lg:col-span-2 bg-surface border border-white/10 rounded-2xl p-6 md:p-8">
          <p className="text-accent text-xs uppercase tracking-widest mb-2">
            Шаг {step} / 5
          </p>

          {/* ШАГ 1 — Услуга */}
          {step === 1 && (
            <>
              <h2 className="font-heading text-3xl font-bold mb-2">Выберите услугу</h2>
              <p className="text-text-muted mb-6">Начните с того, что хотите изменить.</p>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((s) => {
                  const active = form.serviceId === s.id;
                  const img = IMAGES[`service${s.id}`] || IMAGES.service1;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setForm({ ...form, serviceId: s.id })}
                      className={`text-left rounded-xl overflow-hidden border-2 transition
                        ${active ? 'border-accent' : 'border-white/10 hover:border-accent/50'}`}
                    >
                      <div className="aspect-video overflow-hidden bg-bg">
                        {img && (
                          <img src={img} alt={s.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="p-4">
                        <div className="font-heading text-lg font-semibold uppercase">{s.title}</div>
                        <div className="text-text-muted text-sm mt-1">{s.description}</div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-accent font-bold text-lg">{s.price} ₽</span>
                          <span className="text-text-muted text-sm">⏱ {s.durationMin} мин</span>
                        </div>
                        <div className="mt-3">
                          {active ? (
                            <span className="text-accent text-sm font-semibold">✓ Выбрано</span>
                          ) : (
                            <span className="text-text-muted text-sm">Выбрать</span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ШАГ 2 — Мастер */}
          {step === 2 && (
            <>
              <h2 className="font-heading text-3xl font-bold mb-2">Выберите мастера</h2>
              <p className="text-text-muted mb-6">
                {selectedService?.title} · {selectedService?.durationMin} мин · {selectedService?.price} ₽
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {masters.map((m) => {
                  const active = form.masterId === m.id;
                  const img = IMAGES[`master${m.id}`] || IMAGES.master1;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setForm({ ...form, masterId: m.id })}
                      className={`text-left rounded-xl overflow-hidden border-2 transition
                        ${active ? 'border-accent' : 'border-white/10 hover:border-accent/50'}`}
                    >
                      <div className="aspect-square overflow-hidden bg-bg">
                        {img && (
                          <img src={img} alt={m.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="p-4">
                        <div className="font-heading text-lg font-semibold uppercase">{m.name}</div>
                        <div className="text-text-muted text-sm mt-1">{m.specialization}</div>
                        <div className="text-accent text-sm mt-2">★ {m.rating}</div>
                        <div className="mt-4">
                          <span className={`inline-block text-sm px-4 py-2 rounded-lg transition ${active ? 'bg-accent text-bg font-semibold' : 'border border-accent text-accent hover:bg-accent hover:text-bg'}`}>
                            {active ? '✓ Выбран' : 'Выбрать'}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ШАГ 3 — Дата */}
          {step === 3 && (
            <>
              <h2 className="font-heading text-3xl font-bold mb-2">Выберите дату</h2>
              <p className="text-text-muted mb-6">
                {selectedMaster?.name} · {selectedService?.title} · {selectedService?.durationMin} мин
              </p>
              <input
                type="date"
                min={today}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-text-main focus:border-accent outline-none"
              />
            </>
          )}

          {/* ШАГ 4 — Время */}
          {step === 4 && (
            <>
              <h2 className="font-heading text-3xl font-bold mb-2">Выберите время</h2>
              <p className="text-text-muted mb-6">
                {form.date} · {selectedMaster?.name}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {TIME_SLOTS.map((t) => {
                  const busy = busySlots.includes(t);
                  const active = form.time === t;
                  return (
                    <button
                      key={t}
                      disabled={busy}
                      onClick={() => setForm({ ...form, time: t })}
                      className={`py-4 rounded-lg border-2 transition text-center
                        ${busy ? 'border-white/5 text-white/20 cursor-not-allowed' : ''}
                        ${!busy && active ? 'border-accent bg-accent/10 text-accent' : ''}
                        ${!busy && !active ? 'border-white/10 hover:border-accent/50' : ''}`}
                    >
                      <div className="font-semibold">{t}</div>
                      <div className="text-xs mt-1 opacity-70">
                        {busy ? 'Занято' : active ? '✓ Выбрано' : 'Свободно'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ШАГ 5 — Подтверждение */}
          {step === 5 && (
            <>
              <h2 className="font-heading text-3xl font-bold mb-2">Подтвердите запись</h2>
              <p className="text-text-muted mb-6">Проверьте детали и оставьте контактные данные.</p>

              <div className="space-y-3 mb-6">
                <Row label="Услуга" value={selectedService?.title} />
                <Row label="Мастер" value={selectedMaster?.name} />
                <Row label="Дата" value={form.date} />
                <Row label="Время" value={`${form.time} · ${selectedService?.durationMin} мин`} />
                <Row label="Стоимость" value={`${selectedService?.price} ₽`} accent />
                <Row label="Адрес" value="Адрес уточняется" />
              </div>

              <h3 className="font-heading text-xl font-semibold mb-3">Ваши контакты</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  defaultValue={user?.user_metadata?.name || ''}
                  className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-text-main focus:border-accent outline-none"
                />
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="+7 ___ ___ __ __"
                    className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-text-main focus:border-accent outline-none"
                  />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    defaultValue={user?.email || ''}
                    className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-text-main focus:border-accent outline-none"
                  />
                </div>
                <p className="text-text-muted text-xs">
                  На email отправим подтверждение. Телефон нужен для связи по записи.
                </p>
              </div>
            </>
          )}

          {error && <p className="text-error text-sm mt-4">{error}</p>}

          <div className="flex justify-between mt-8">
            <button
              onClick={back}
              disabled={step === 1}
              className="px-6 py-3 rounded-lg border border-white/10 text-text-muted hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              ← Назад
            </button>

            {step < 5 ? (
              <button
                onClick={next}
                className="bg-accent text-bg px-8 py-3 rounded-lg font-semibold hover:brightness-110 transition"
              >
                Продолжить →
              </button>
            ) : (
              <button
                onClick={submit}
                className="bg-accent text-bg px-8 py-3 rounded-lg font-semibold hover:brightness-110 transition"
              >
                Подтвердить запись
              </button>
            )}
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ */}
        <aside className="bg-surface border border-white/10 rounded-2xl p-6 h-fit sticky top-24">
          <h3 className="font-heading text-xl font-semibold mb-4"> Ваша запись</h3>

          <div className="space-y-3 text-sm">
            <Row label="Услуга" value={selectedService?.title || 'Не выбрано'} small />
            <Row label="Мастер" value={selectedMaster?.name || 'Не выбрано'} small />
            <Row label="Дата" value={form.date || 'Не выбрано'} small />
            <Row label="Время" value={form.time || 'Не выбрано'} small />
          </div>

          <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center">
            <span className="text-text-muted text-sm">
              {selectedService?.durationMin || 0} мин
            </span>
            <span className="text-accent font-bold text-2xl">
              {selectedService?.price || 0} ₽
            </span>
          </div>

          <p className="text-text-muted text-xs mt-4"> Адрес уточняется</p>
          <p className="text-text-muted text-xs mt-1">
            Оплата в барбершопе после услуги.
          </p>
        </aside>
      </div>
    </section>
  );
}

function Row({ label, value, small = false, accent = false }) {
  return (
    <div className={`flex justify-between ${small ? '' : 'border-b border-white/10 pb-3'}`}>
      <span className="text-text-muted">{label}</span>
      <span className={`font-semibold ${accent ? 'text-accent text-lg' : ''}`}>{value || '—'}</span>
    </div>
  );
}