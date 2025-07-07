export default async function SearchPage({ params }) {
   const { searchId } = await params;

   // encodeURIComponent is necessary since the searchId may contain
   // weird non unicode characters, this will fix that.
   const res = await fetch(
       `http://localhost:3000/api/search?text=${encodeURIComponent(searchId)}&type=video`,
       { cache: "no-store" } // this is optional
                           // included so there is always
                           // new / fresh data
   );

   const videos = await res.json();

   // Filter out shorts and channels, only keep regular videos
   const filteredVideos = videos.items?.filter(video => {
     // Make sure it's a video (not a channel or playlist)
     if (video.id.kind !== 'youtube#video') return false;
     
     // Filter out shorts (videos with #shorts in title or description)
     const title = video.snippet.title.toLowerCase();
     const description = video.snippet.description.toLowerCase();
     if (title.includes('#shorts') || title.includes('short') || 
         description.includes('#shorts') || description.includes('short')) {
       return false;
     }
     
     // Filter out very short videos (likely shorts) - less than 60 seconds
     // Note: This is approximate since we don't have duration in search results
     // but we can filter based on title patterns
     if (title.includes('60 second') || title.includes('30 second') || 
         title.includes('15 second') || title.includes('10 second')) {
       return false;
     }
     
     return true;
   }) || [];

   return (
     <div className="w-screen min-h-screen flex flex-col items-center justify-start text-white bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
       <h1 className="text-4xl mt-6 mb-4 text-teal-200 font-light">Search Results for: {searchId}</h1>
  
       <div className="flex flex-col items-center w-full overflow-y-auto pb-10">
         {filteredVideos.length > 0 ? (
           filteredVideos.map((vid) => { // go through every video in the items
              // cant use useRouter() since this is SSR
              return (
               <a href={`/video/${vid.id.videoId}`} key={vid.id.videoId} className="w-1/2 max-w-3xl bg-slate-800/50 rounded-2xl p-3 m-3 flex items-start gap-3 border border-slate-600 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-200">
                 <img
                   src={vid.snippet.thumbnails.medium?.url || vid.snippet.thumbnails.default?.url}
                   alt={vid.snippet.title}
                   width={160}
                   height={120}
                   className="rounded-md shrink-0 object-fill"
                 />
                 <div className="flex flex-col justify-start h-full p-3">
                   <h2 className="text-lg font-semibold leading-tight mb-1 text-teal-200">{vid.snippet.title}</h2>
                   <p className="text-sm text-slate-300 leading-snug">{vid.snippet.description}</p>
                   <p className="text-xs text-slate-400 mt-2">{vid.snippet.channelTitle}</p>
                   <p className="text-xs text-slate-500 mt-1">{new Date(vid.snippet.publishedAt).toLocaleDateString()}</p>
                 </div>
               </a>
             );
           })
         ) : (
           <div className="text-center text-slate-400 mt-8">
             <p>No videos found for "{searchId}".</p>
             <p className="text-sm mt-2">Try a different search term or check your spelling.</p>
           </div>
         )}
       </div>
     </div>
   );
  }