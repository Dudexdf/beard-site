import { Link, useLocation } from 'react-router-dom';

const titles = {
  services: 'Услуги',
  masters: 'Мастера',
  booking: 'Запись',
  account: 'Личный кабинет',
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-text-muted mb-6">
      <Link to="/" className="hover:text-accent transition">Главная</Link>
      {parts.map((part, i) => {
        const to = '/' + parts.slice(0, i + 1).join('/');
        return (
          <span key={to}>
            <span className="mx-2">/</span>
            <Link to={to} className="hover:text-accent transition">
              {titles[part] || part}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}