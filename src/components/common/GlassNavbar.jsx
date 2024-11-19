export default function GlassNavbar() {
  return (
    <nav className="w-full bg-white/30 backdrop-blur-lg shadow-md p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">Brand</div>
      <ul className="flex gap-4">
        <li className="text-white/80 hover:text-white">Home</li>
        <li className="text-white/80 hover:text-white">About</li>
        <li className="text-white/80 hover:text-white">Contact</li>
      </ul>
    </nav>
  );
}