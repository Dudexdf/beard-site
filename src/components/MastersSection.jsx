import MasterCard from './MasterCard';

const masters = [
  { name: 'Александр', specialization: 'Классические стрижки', rating: 4.9 },
  { name: 'Максим', specialization: 'Фейды и современные стрижки', rating: 5.0 },
  { name: 'Игорь', specialization: 'Борода и бритьё', rating: 4.8 },
];

export default function MastersSection() {
  return (
    <section className="py-20 px-4 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
          Наши мастера
        </h2>
        <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
          Опытные барберы с многолетним стажем
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {masters.map((m) => (
            <MasterCard key={m.name} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}