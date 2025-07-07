export default function Loading() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-600 border-t-teal-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl text-teal-200 font-light mb-2">Searching Playlists</h2>
          <p className="text-slate-400">Finding the perfect playlists for you...</p>
        </div>
      </div>
    </div>
  );
} 