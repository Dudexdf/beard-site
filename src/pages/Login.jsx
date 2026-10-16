import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(form.email, form.password);
    setLoading(false);

    if (error) {
      setError('Неверный email или пароль');
    } else {
      navigate('/account');
    }
  };

  return (
    <section className="w-full max-w-md">
      <h1 className="font-heading text-4xl font-bold mb-2 text-center">Вход</h1>
      <p className="text-text-muted text-center mb-8">
        Войдите, чтобы управлять записями
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-text-main focus:border-accent outline-none"
        />

        {error && <p className="text-error text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-bg py-3 rounded-lg font-semibold hover:brightness-110 transition disabled:opacity-50"
        >
          {loading ? 'Входим…' : 'Войти'}
        </button>
      </form>

      <p className="text-text-muted text-center mt-6 text-sm">
        Нет аккаунта?{' '}
        <Link to="/register" className="text-accent hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </section>
  );
}