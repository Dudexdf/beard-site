import { useState } from 'react';
import FadeIn from './FadeIn';

const reviews = [
  {
    id: 1,
    name: 'Дмитрий Смирнов',
    text: 'Отличный барбершоп! Записался онлайн за 2 минуты, мастер Александр сделал идеальный фейд. Приду ещё.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Алина Иванова',
    text: 'Ходим с мужем только сюда. Запись через сайт — удобно, не надо звонить. Атмосфера премиум, всё чисто.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Сергей Петров',
    text: 'Максим — мастер от бога. Сделал стрижку и бороду за час. Цена честная, результат на 10 из 10.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Екатерина Орлова',
    text: 'Записываю сына на детскую стрижку. Мастер Дмитрий терпеливый и аккуратный — сын больше не боится.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Игорь Николаев',
    text: 'Хожу уже полгода. Онлайн-запись работает без сбоев, кабинет удобный, всегда вижу свои визиты.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Максим Волков',
    text: 'Попал случайно, теперь только сюда. Игорь делает королевское бритьё — это отдельный ритуал.',
    rating: 4,
  },
];

export default function ReviewsSection() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? reviews : reviews.slice(0, 3);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Отзывы клиентов
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Более 500 довольных клиентов доверяют нам свой образ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((r) => (
              <article
                key={r.id}
                className="bg-surface border border-white/10 rounded-2xl p-6 hover:border-accent/40 transition flex flex-col"
              >
                <div className="text-accent text-lg mb-4">
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </div>

                <p className="text-text-muted italic leading-relaxed mb-6 flex-1">
                  «{r.text}»
                </p>

                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/40 to-accent/10 flex items-center justify-center font-heading font-bold text-accent text-lg">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-text-muted text-xs">Клиент барбершопа</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Кнопка показать все / свернуть */}
          {reviews.length > 3 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setExpanded(!expanded)}
                className="border border-accent text-accent px-8 py-3 rounded-lg font-semibold hover:bg-accent hover:text-bg transition"
              >
                {expanded ? 'Свернуть' : `Показать все отзывы (${reviews.length})`}
              </button>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}