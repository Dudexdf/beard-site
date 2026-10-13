import Card from './Card';

export default function MasterCard({ name, specialization, rating }) {
  return (
    <Card>
      <div className="aspect-square bg-gradient-to-br from-bg to-surface rounded-lg mb-4 border border-white/5"></div>
      <h3 className="font-heading text-xl font-semibold mb-1">{name}</h3>
      <p className="text-text-muted text-sm mb-3">{specialization}</p>
      <div className="flex items-center gap-2">
        <span className="text-accent">★</span>
        <span className="text-text-main font-semibold">{rating}</span>
      </div>
    </Card>
  );
}