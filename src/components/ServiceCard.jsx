import Card from './Card';

export default function ServiceCard({ title, description, price, duration }) {
  return (
    <Card>
      <div className="aspect-video bg-gradient-to-br from-bg to-surface rounded-lg mb-4 border border-white/5"></div>
      <h3 className="font-heading text-xl font-semibold mb-2">{title}</h3>
      <p className="text-text-muted text-sm mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-accent font-bold text-lg">{price} ₽</span>
        <span className="text-text-muted text-sm">{duration} мин</span>
      </div>
    </Card>
  );
}