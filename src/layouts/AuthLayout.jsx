import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Мини-шапка — только логотип, ведёт на главную */}
      <header className="py-6 px-4">
        <Link to="/" className="font-heading text-2xl font-bold text-accent inline-block">
          BEARD
        </Link>
      </header>

      {/* Центрируем форму по вертикали и горизонтали */}
      <main className="flex-1 flex items-center justify-center px-4">
        <Outlet />
      </main>

      {/* Мини-подвал — только копирайт */}
      <footer className="py-6 text-center text-text-muted text-xs">
        © 2026 Beard
      </footer>
    </div>
  );
}