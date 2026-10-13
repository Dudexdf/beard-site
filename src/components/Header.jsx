export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <a href="/" className="font-heading text-2xl font-bold text-accent">
          BEARD
        </a>

        <nav className="hidden md:flex gap-6 text-text-muted">
          <a href="/services" className="hover:text-accent transition">Услуги</a>
          <a href="/masters" className="hover:text-accent transition">Мастера</a>
          <a href="/about" className="hover:text-accent transition">О нас</a>
          <a href="/contacts" className="hover:text-accent transition">Контакты</a>
        </nav>

        <a
          href="/booking"
          className="bg-accent text-bg px-5 py-2 rounded-lg font-semibold hover:brightness-110 transition"
        >
          Записаться
        </a>
      </div>
    </header>
  );
}