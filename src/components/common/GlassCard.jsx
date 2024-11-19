export default function GlassCard() {
  return (
    <div className="w-80 h-48 bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-4 flex flex-col justify-between">
      <h2 className="text-xl font-semibold text-white">Glassmorphic Card</h2>
      <p className="text-sm text-white/80">
        This is a card component with a frosted glass effect.
      </p>
      <button className="mt-4 bg-white/50 text-black rounded px-4 py-2 hover:bg-white/70">
        Learn More
      </button>
    </div>
  );
}