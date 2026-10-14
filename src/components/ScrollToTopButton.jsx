import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 bg-accent text-bg w-12 h-12 rounded-full font-bold shadow-lg hover:brightness-110 transition z-40"
      aria-label="Наверх"
    >
      ↑
    </button>
  );
}