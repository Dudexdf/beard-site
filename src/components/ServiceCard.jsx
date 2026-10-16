import Card from './Card';

export default function ServiceCard({ title, description, price, duration, image }) {
  return (
    <Card>
      <div className="aspect-video rounded-lg mb-4 overflow-hidden border border-white/5">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-bg to-surface" />
        )}
      </div>
      <h3 className="font-heading text-xl font-semibold mb-2">{title}</h3>
      <p className="text-text-muted text-sm mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-accent font-bold text-lg">{price} ₽</span>
        <span className="text-text-muted text-sm">{duration} мин</span>
      </div>
    </Card>
  );
}