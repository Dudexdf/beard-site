import Card from './Card';

export default function MasterCard({ name, specialization, rating, image }) {
  return (
    <Card>
      <div className="aspect-square rounded-lg mb-4 overflow-hidden border border-white/5">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-bg to-surface" />
        )}
      </div>
      <h3 className="font-heading text-xl font-semibold mb-1">{name}</h3>
      <p className="text-text-muted text-sm mb-3">{specialization}</p>
      <div className="flex items-center gap-2">
        <span className="text-accent">★</span>
        <span className="text-text-main font-semibold">{rating}</span>
      </div>
    </Card>
  );
}