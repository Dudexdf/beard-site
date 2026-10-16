import FadeIn from './FadeIn';
export default function CTA() {
  return (
    <section className="bg-accent py-16 px-4">
      <FadeIn>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-bg mb-4">
          Готовы к новому образу?
        </h2>
        <p className="text-bg/70 text-lg mb-8">
          Запишитесь онлайн за 2 минуты — без звонков и ожидания
        </p>
        <a
          href="/booking"
          className="inline-block bg-bg text-accent px-8 py-4 rounded-lg font-semibold hover:brightness-110 transition"
        >
          Записаться онлайн
        </a>
      </div>
      </FadeIn>
    </section>
  );
}