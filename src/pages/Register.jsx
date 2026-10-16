import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Пароль должен быть не короче 6 символов');
      return;
    }

    setLoading(true);
    const { error } = await signUp(form.email, form.password, form.name);
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate('/account');
    }
  };

  return (
    <section className="w-full max-w-md">
      <h1 className="font-heading text-4xl font-bold mb-2 text-center">Регистрация</h1>
      <p className="text-text-muted text-center mb-8">
        Создайте аккаунт, чтобы управлять записями
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-text-main focus:border-accent outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-text-main focus:border-accent outline-none"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Телефон (+79001234567)"
          value={form.phone}
          onChange={handleChange}
          className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-text-main focus:border-accent outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль (минимум 6 символов)"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-text-main focus:border-accent outline-none"
        />

        {error && (
          <p className="text-error text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-bg py-3 rounded-lg font-semibold hover:brightness-110 transition disabled:opacity-50"
        >
          {loading ? 'Создаём…' : 'Создать аккаунт'}
        </button>
      </form>

      <p className="text-text-muted text-center mt-6 text-sm">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="text-accent hover:underline">
          Войти
        </Link>
      </p>
    </section>
  );
}