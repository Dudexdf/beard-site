import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const linkCls = ({ isActive }) =>
  `hover:text-accent transition ${isActive ? 'text-accent font-semibold' : 'text-text-muted'}`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="font-heading text-2xl font-bold text-accent">
          BEARD
        </Link>

        <nav className="hidden md:flex gap-6">
          <NavLink to="/services" className={linkCls}>Услуги</NavLink>
          <NavLink to="/masters" className={linkCls}>Мастера</NavLink>
          <NavLink to="/booking" className={linkCls}>Запись</NavLink>
          {user && (
            <NavLink to="/account" className={linkCls}>Кабинет</NavLink>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-text-muted text-sm">
                {user.user_metadata?.name || user.email}
              </span>
              <button
                onClick={signOut}
                className="text-text-muted hover:text-accent transition"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-text-muted hover:text-accent transition"
            >
              Войти
            </Link>
          )}

          <Link
            to="/booking"
            className="bg-accent text-bg px-5 py-2 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Записаться
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-text-main"
          aria-label="Меню"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-surface flex flex-col gap-4 px-6 py-6 border-t border-white/10">
          <NavLink to="/services" className={linkCls} onClick={() => setOpen(false)}>Услуги</NavLink>
          <NavLink to="/masters" className={linkCls} onClick={() => setOpen(false)}>Мастера</NavLink>
          <NavLink to="/booking" className={linkCls} onClick={() => setOpen(false)}>Запись</NavLink>
          {user && (
            <NavLink to="/account" className={linkCls} onClick={() => setOpen(false)}>Кабинет</NavLink>
          )}

          {user ? (
            <button
              onClick={() => { signOut(); setOpen(false); }}
              className="text-left text-text-muted hover:text-accent transition"
            >
              Выйти ({user.user_metadata?.name || user.email})
            </button>
          ) : (
            <NavLink to="/login" className={linkCls} onClick={() => setOpen(false)}>Войти</NavLink>
          )}

          <Link
            to="/booking"
            className="bg-accent text-bg text-center px-5 py-3 rounded-lg font-semibold hover:brightness-110 transition"
            onClick={() => setOpen(false)}
          >
            Записаться
          </Link>
        </nav>
      )}
    </header>
  );
}