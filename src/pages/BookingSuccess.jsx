import { Link, useLocation, Navigate } from 'react-router-dom';

export default function BookingSuccess() {
  const { state } = useLocation();

  if (!state) return <Navigate to="/booking" />;

  return (
    <section className="max-w-2xl mx-auto px-4 py-24 text-center">
      {/* Галочка */}
      <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-bg text-4xl font-bold">✓</span>
      </div>

      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
        Вы записаны!
      </h1>
      <p className="text-text-muted mb-10">
        Мы ждём вас в барбершопе Beard
      </p>

      {/* Карточка записи */}
      <div className="bg-surface border border-white/10 rounded-2xl p-6 text-left space-y-3 mb-8">
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-text-muted">Услуга</span>
          <span className="font-semibold">{state.service?.title}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-text-muted">Мастер</span>
          <span className="font-semibold">{state.master?.name}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-text-muted">Дата</span>
          <span className="font-semibold">{state.date}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-text-muted">Время</span>
          <span className="font-semibold">{state.time}</span>
        </div>
        <div className="flex justify-between pt-2">
          <span className="text-text-muted">Стоимость</span>
          <span className="text-accent font-bold text-lg">{state.service?.price} ₽</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 justify-center">
        <Link
          to="/account"
          className="bg-accent text-bg px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition"
        >
          Перейти в личный кабинет
        </Link>
        <Link
          to="/"
          className="border border-accent text-accent px-6 py-3 rounded-lg font-semibold hover:bg-accent hover:text-bg transition"
        >
          На главную
        </Link>
      </div>
    </section>
  );
}