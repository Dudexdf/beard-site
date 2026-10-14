import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-heading text-8xl font-bold text-accent mb-4">404</h1>
      <p className="text-text-muted text-lg mb-8">Такой страницы не существует</p>
      <Link
        to="/"
        className="bg-accent text-bg px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition"
      >
        На главную
      </Link>
    </section>
  );
}