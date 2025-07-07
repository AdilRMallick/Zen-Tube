export default async function PlaylistSearchPage({ params }) {
   const { searchId } = await params;

   // encodeURIComponent is necessary since the searchId may contain
   // weird non unicode characters, this will fix that.
   const res = await fetch(
       `http://localhost:3000/api/playlist-search?text=${encodeURIComponent(searchId)}`,
       { cache: "no-store" } // this is optional
                           // included so there is always
                           // new / fresh data
   );

   const playlists = await res.json();

   // Filter out any non-playlist items and apply additional filtering
   const filteredPlaylists = playlists.items?.filter(playlist => {
     // Make sure it's a playlist (not a video or channel)
     if (playlist.id.kind !== 'youtube#playlist') return false;
     
     // Filter out playlists with very generic names
     const title = playlist.snippet.title.toLowerCase();
     if (title.includes('favorites') || title.includes('watch later') || 
         title.includes('liked videos') || title.includes('history')) {
       return false;
     }
     
     return true;
   }) || [];

   return (
     <div className="w-screen min-h-screen flex flex-col items-center justify-start text-white bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
       <h1 className="text-4xl mt-6 mb-4 text-teal-200 font-light">Playlist Search Results for: {searchId}</h1>
  
       <div className="flex flex-col items-center w-full overflow-y-auto pb-10">
         {filteredPlaylists.length > 0 ? (
           filteredPlaylists.map((playlist) => {
              return (
               <a href={`/playlist/${playlist.id.playlistId}`} key={playlist.id.playlistId} className="w-1/2 max-w-3xl bg-slate-800/50 rounded-2xl p-3 m-3 flex items-start gap-3 border border-slate-600 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-200">
                 <img
                   src={playlist.snippet.thumbnails.medium?.url || playlist.snippet.thumbnails.default?.url}
                   alt={playlist.snippet.title}
                   width={160}
                   height={120}
                   className="rounded-md shrink-0 object-fill"
                 />
                 <div className="flex flex-col justify-start h-full p-3">
                   <h2 className="text-lg font-semibold leading-tight mb-1 text-teal-200">{playlist.snippet.title}</h2>
                   <p className="text-sm text-slate-300 leading-snug">{playlist.snippet.description}</p>
                   <p className="text-xs text-slate-400 mt-2">{playlist.snippet.channelTitle}</p>
                   <p className="text-xs text-slate-500 mt-1">{new Date(playlist.snippet.publishedAt).toLocaleDateString()}</p>
                   <div className="flex items-center gap-2 mt-2">
                     <span className="text-xs text-slate-400">Playlist</span>
                     <span className="text-xs text-teal-300">•</span>
                     <span className="text-xs text-slate-400">{playlist.snippet.channelTitle}</span>
                   </div>
                 </div>
               </a>
             );
           })
         ) : (
           <div className="text-center text-slate-400 mt-8">
             <p>No playlists found for "{searchId}".</p>
             <p className="text-sm mt-2">Try a different search term or check your spelling.</p>
           </div>
         )}
       </div>
     </div>
   );
  } 