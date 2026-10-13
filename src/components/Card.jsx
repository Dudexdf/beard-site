export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-surface rounded-xl p-5 shadow-lg shadow-black/30 hover:-translate-y-1 transition duration-300 ${className}`}>
      {children}
    </div>
  );
}