export default function Button({ children, variant = 'primary', ...props }) {
  const base = 'px-6 py-3 rounded-lg font-semibold transition inline-block text-center';
  const styles =
    variant === 'primary'
      ? 'bg-accent text-bg hover:brightness-110'
      : 'border border-accent text-accent hover:bg-accent hover:text-bg';

  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
}