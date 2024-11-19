export default function GlassModal({ showModal, onClose }: { showModal: boolean; onClose: () => void }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="w-96 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-white font-bold">Glassmorphic Modal</h2>
        <p className="text-white/80 mt-2">
          This is a modal with a glassmorphism effect.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-white/40 text-black px-4 py-2 rounded hover:bg-white/60"
        >
          Close
        </button>
      </div>
    </div>
  );
}