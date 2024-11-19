export default function GlassLoginBox() {
    return (
      <div className="w-96 bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded bg-white/40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-white/40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white/50 text-black py-2 rounded hover:bg-white/70"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
  