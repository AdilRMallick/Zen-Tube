export default async function Playlist({ params }) {
   const { playlistId } = await params;

   // Call the playlist API to get playlist details
   const res = await fetch(
       `http://localhost:3000/api/playlist?playlistId=${encodeURIComponent(playlistId)}`,
       { cache: 'no-store' }
   );

   const playlistData = await res.json();
   const playlist = playlistData?.items?.[0];

   // Get playlist title or use a fallback
   const playlistTitle = playlist?.snippet?.title || `Playlist: ${playlistId}`;

   return (
     <div className="w-screen min-h-screen flex flex-col items-center justify-start text-white bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
       <h1 className="text-4xl mt-6 mb-4 text-teal-200 font-light">{playlistTitle}</h1>
  
       <div className="flex flex-col items-center w-full overflow-y-auto pb-10">
         {playlistData.items && playlistData.items.length > 0 ? (
           playlistData.items.map((item) => {
             return (
               <a href={`/video/${item.snippet.resourceId.videoId}`} key={item.snippet.resourceId.videoId} className="w-1/2 max-w-3xl bg-slate-800/50 rounded-2xl p-3 m-3 flex items-start gap-3 border border-slate-600 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-200">
                 <img
                   src={item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url}
                   alt={item.snippet.title}
                   width={160}
                   height={120}
                   className="rounded-md shrink-0 object-fill"
                 />
                 <div className="flex flex-col justify-start h-full p-3">
                   <h2 className="text-lg font-semibold leading-tight mb-1 text-teal-200">{item.snippet.title}</h2>
                   <p className="text-sm text-slate-300 leading-snug">{item.snippet.description}</p>
                 </div>
               </a>
             );
           })
         ) : (
           <div className="text-center text-slate-400 mt-8">
             <p>No videos found in this playlist.</p>
             <p className="text-sm mt-2">The playlist might be private or empty.</p>
           </div>
         )}
       </div>
     </div>
   );
}