import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const linkCls = ({ isActive }) =>
  `hover:text-accent transition ${isActive ? 'text-accent font-semibold' : 'text-text-muted'}`;

export default function Header() {
  const [open, setOpen] = useState(false);

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
          <NavLink to="/account" className={linkCls}>Кабинет</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/booking"
            className="hidden md:inline-block bg-accent text-bg px-5 py-2 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Записаться
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-text-main"
            aria-label="Меню"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-surface flex flex-col gap-4 px-6 py-6 border-t border-white/10">
          <NavLink to="/services" className={linkCls} onClick={() => setOpen(false)}>Услуги</NavLink>
          <NavLink to="/masters" className={linkCls} onClick={() => setOpen(false)}>Мастера</NavLink>
          <NavLink to="/booking" className={linkCls} onClick={() => setOpen(false)}>Запись</NavLink>
          <NavLink to="/account" className={linkCls} onClick={() => setOpen(false)}>Кабинет</NavLink>
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