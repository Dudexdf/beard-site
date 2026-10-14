import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 py-10 px-4 mt-auto">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-heading text-xl text-accent mb-3">BEARD</div>
          <p className="text-text-muted text-sm">
            Барбершоп премиум-класса. Онлайн-запись 24/7.
          </p>
        </div>

        <div>
          <div className="font-semibold mb-3">Навигация</div>
          <ul className="text-text-muted text-sm space-y-2">
            <li><Link to="/services" className="hover:text-accent transition">Услуги</Link></li>
            <li><Link to="/masters" className="hover:text-accent transition">Мастера</Link></li>
            <li><Link to="/booking" className="hover:text-accent transition">Запись</Link></li>
            <li><Link to="/account" className="hover:text-accent transition">Личный кабинет</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Соцсети</div>
          <ul className="text-text-muted text-sm space-y-2">
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener" className="hover:text-accent transition">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://t.me" target="_blank" rel="noopener" className="hover:text-accent transition">
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-text-muted text-xs mt-8">© 2026 Beard. Все права защищены.</div>
    </footer>
  );
}