export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Стрижка, которая <span className="text-accent">говорит за тебя</span>
          </h1>
          <p className="text-text-muted text-lg mb-8">
            Онлайн-запись к лучшим барберам города за 2 минуты.
          </p>
          <a
            href="/booking"
            className="inline-block bg-accent text-bg px-8 py-4 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Записаться сейчас
          </a>
        </div>

        <div className="aspect-square rounded-2xl bg-gradient-to-br from-surface to-bg border border-white/10"></div>
      </div>
    </section>
  );
}