export default function GlassInput({ type, placeholder }: { type: string; placeholder: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded bg-white/40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}