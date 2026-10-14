import ServiceCard from './ServiceCard';

const services = [
  { title: 'Мужская стрижка', description: 'Классическая стрижка машинкой и ножницами', price: 1500, duration: 45 },
  { title: 'Стрижка бороды', description: 'Моделирование и уход за бородой', price: 1000, duration: 30 },
  { title: 'Стрижка + борода', description: 'Комплексный уход: стрижка и борода', price: 2200, duration: 75 },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
          Наши услуги
        </h2>
        <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
          Профессиональный уход в комфортной атмосфере
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}